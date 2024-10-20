import cv2
import mediapipe as mp
import math
import os


class poseDetector():
    """
    creates instance of video
    """
    def __init__(self,static_image_mode=False, model_complexity=1, smooth_landmarks=True, enable_segmentation=False,
                smooth_segmentation=True, min_detection_confidence=0.5, min_tracking_confidence=0.5):
        
        self.static_image_mode=False
        self.model_complexity=1
        self.smooth_landmarks=True
        self.enable_segmentation=False
        self.smooth_segmentation=True
        self.min_detection_confidence=0.5
        self.min_tracking_confidence=0.5
        self.num_poses=4


        # Initialize drawing and pose utilities from MediaPipe
        self.mpDraw = mp.solutions.drawing_utils
        self.mpPose = mp.solutions.pose
        self.pose = self.mpPose.Pose(self.static_image_mode, self.model_complexity, self.smooth_landmarks, self.enable_segmentation, self.smooth_segmentation, self.min_detection_confidence, self.min_tracking_confidence)
        self.landmark_dict = {0: "nose", 1: "left eye (inner)", 2: "left eye", 3: "left eye (outer)", 4: "right eye (inner)", 5: "right eye", 6: "right eye (outer)", 7: "left ear", 8: "right ear", 9: "mouth (left)", 10: "mouth (right)", 11: "left shoulder", 12: "right shoulder", 13: "left elbow", 14: "right elbow", 15: "left wrist", 16: "right wrist", 17: "left pinky", 18: "right pinky", 19: "left index", 20: "right index", 21: "left thumb", 22: "right thumb", 23: "left hip", 24: "right hip", 25: "left knee", 26: "right knee", 27: "left ankle", 28: "right ankle", 29: "left heel", 30: "right heel", 31: "left foot index", 32: "right foot index"}

        self.critical_poses = []
        self.critical_pose = {}
        
        self.critical_limbs = []
        self.timestamp = 0

        self.reba_score = 0
        self.count = 0
        self.total_reba_score = 0
        self.average_reba_score = 0
        self.all_limbs = {}

        self.reba_stats = {"good":0, "fair":0, "poor":0}
        self.upper_arm_stats = {"good":0, "fair":0, "poor":0}
        self.lower_arm_stats = {"good":0, "fair":0, "poor":0}
        self.trunk_stats = {"good":0, "fair":0, "poor":0}
        self.leg_stats = {"good":0, "fair":0, "poor":0}
        self.neck_stats = {"good":0, "fair":0, "poor":0}
        self.wrist_stats = {"good":0, "fair":0, "poor":0}

        self.highest_angles = {
            "upper_arm": 0,
            "lower_arm": 0,
            "trunk": 0,
            "neck": 0,
            "leg": 0,
            "wrist": 0
        }
    
    def find_pose(self, img, draw=True):
        """
        returns a frame of the pose with joint points and lines drawn. 

        A LOT of this code is just code to draw the lines inbetween the head.
        """

        imgRGB = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        self.results = self.pose.process(imgRGB)

        # Draws data from joint points on body in live video, excluding face landmarks (0 to 10)
        if self.results.pose_landmarks:
            if draw:
                line_spec = self.mpDraw.DrawingSpec(color=(86, 183, 18), thickness=11)  # Green lines
                landmark_spec = self.mpDraw.DrawingSpec(color=(1, 183, 86), thickness=11)  # Red points

                # Get the landmark list
                pose_landmarks = self.results.pose_landmarks.landmark

                # Calculate the midpoints between shoulders and ears
                left_shoulder = pose_landmarks[11]  # Left shoulder
                right_shoulder = pose_landmarks[12]  # Right shoulder
                left_ear = pose_landmarks[7]  # Left ear
                right_ear = pose_landmarks[8]  # Right ear

                # Midpoint between shoulders
                mid_shoulders = (
                    (left_shoulder.x + right_shoulder.x) / 2,
                    (left_shoulder.y + right_shoulder.y) / 2
                )

                # Midpoint between ears
                mid_ears = (
                    (left_ear.x + right_ear.x) / 2,
                    (left_ear.y + right_ear.y) / 2
                )

                # Convert these midpoints to image coordinates
                h, w, _ = img.shape
                mid_shoulders_coord = (int(mid_shoulders[0] * w), int(mid_shoulders[1] * h))
                mid_ears_coord = (int(mid_ears[0] * w), int(mid_ears[1] * h))
                left_ear_coord = (int(left_ear.x * w), int(left_ear.y * h))
                right_ear_coord = (int(right_ear.x * w), int(right_ear.y * h))

                # Draw connections from the middle of the shoulders to the middle of the ears
                cv2.line(img, mid_shoulders_coord, mid_ears_coord,  (86, 183, 18), 11)
                # Draw lines from mid-ears to left and right ears
                cv2.line(img, mid_ears_coord, left_ear_coord, (86, 183, 18), 11)
                cv2.line(img, mid_ears_coord, right_ear_coord, (86, 183, 18), 11)

                # Now draw the usual body pose connections, excluding face connections (0-10)
                connections = [
                conn for conn in self.mpPose.POSE_CONNECTIONS
                if conn[0] > 10 and conn[1] > 10 or conn[0] == 0 and conn[1] == 0 # Exclude face connections, except nose
            ]
                self.mpDraw.draw_landmarks(
                    img, 
                    self.results.pose_landmarks,
                    connections,  # Use filtered connections
                    connection_drawing_spec=line_spec,
                    landmark_drawing_spec=None
                )
                return img

    def find_position(self, img, draw=True):
        """
        Calculates coordinates of each joint in the given image frame

        Returns: list of landmarks
        """
        self.landmark_list = []

        if self.results.pose_landmarks:
            
            for id, landmark in enumerate(self.results.pose_landmarks.landmark):
                height, width, channel = img.shape
                # convert to pixel value
                cx, cy = int(landmark.x * width), int(landmark.y * height)
                self.landmark_list.append({"id":id, "x":cx, "y":cy})
                

        return self.landmark_list

    def find_direction(self, landmarks):
        """
        Finds direction that person is facing based off landmark confidence scores

        Returns: "left" or "right"

        POSSIBLE EDGE CASE: If joint is covered for some reason, could return wrong direction. 
        Can make it to where if we arent FOR SURE what direction they are facing, we can skip the frame. 
        """
        left_score = 0
        right_score = 0
        
        # Adds up confidence scores from each side of the body
        for landmark in landmarks:
            if landmark['id'] in [2,7,9,11,13,23,25]:
                left_score += self.results.pose_landmarks.landmark[landmark['id']].visibility
                ### print(f'{self.landmark_dict[landmark['id']]}: {self.results.pose_landmarks.landmark[landmark['id']].visibility} ')
            if landmark['id'] in [5,8,10,12,14,24,26]:
                right_score += self.results.pose_landmarks.landmark[landmark['id']].visibility
                ### print(f'{self.landmark_dict[landmark['id']]}: {self.results.pose_landmarks.landmark[landmark['id']].visibility} ')
            

        if left_score > right_score:
            return "left"
        else:
            return "right"


    def find_angle(self, img, p1, p2, p3, draw=True):
        """
        calculates the angle between three joints in a frame
        """
        ## Get positions of the three joints
        x1, y1 = list(p1.values())[-2:]
        x2, y2 = list(p2.values())[-2:]
        x3, y3 = list(p3.values())[-2:]

        ## Calculate angle
        angle = math.degrees(math.atan2(y3-y2, x3-x2,) - math.atan2(y1-y2, x1-x2))
        if angle < 0:
            angle += 360

        """## Makes points green and displays live angle
        if draw:
            cv2.circle(img, (x1,y1), 5, (0,255,0), cv2.FILLED)
            cv2.circle(img, (x2,y2), 5, (0,255,0), cv2.FILLED)
            cv2.circle(img, (x3,y3), 5, (0,255,0), cv2.FILLED)
            cv2.putText(img, str(int(angle)), (x2 - 20, y2+50), cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 255), 2)
"""
        return angle
    
    def blur_face(self, img):
        """
        Function to blur the detected face
        """

        # Detect faces in the entire image
        mp_face_detection = mp.solutions.face_detection.FaceDetection(min_detection_confidence=0.5)
        results_faces = mp_face_detection.process(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        
        if results_faces.detections:
            for detection in results_faces.detections:
                # Get bounding box for the face
                bboxC = detection.location_data.relative_bounding_box
                image_height, image_width, _ = img.shape
                x_min = int(bboxC.xmin * image_width)
                y_min = int(bboxC.ymin * image_height)
                x_max = x_min + int(bboxC.width * image_width)
                y_max = y_min + int(bboxC.height * image_height)
                
                # Extract the region of interest (ROI) and apply Gaussian blur
                roi = img[y_min:y_max, x_min:x_max]
                blurred_roi = cv2.GaussianBlur(roi, (99, 99), 30)
                img[y_min:y_max, x_min:x_max] = blurred_roi

        return img
    

    def change_line_color(self, img, color, p1, p2):
        """
        Changes line color between two landmarks on the body
        """
        
        if (self.results.pose_landmarks.landmark[p1['id']].visibility > 0.7 and 
        self.results.pose_landmarks.landmark[p2['id']].visibility > 0.7):

            # Ensure the coordinates are integers
            p1_coords = (int(p1['x']), int(p1['y']))
            p2_coords = (int(p2['x']), int(p2['y']))

            # Draw the line with the specified color
            if color == "yellow":
                cv2.line(img, p1_coords, p2_coords, (42, 212, 227), 11)  # Yellow
            elif color == "red":
                cv2.line(img, p1_coords, p2_coords, (61, 61, 255), 11)  # Red

    
    def find_critical_poses(self, img, reba_score, frame, critical_limb):
        """
        finds most dangerous poses in video per specified amount of frames, adds the frame to class list
        """
        ## stores each videos critical limbs
        self.critical_limbs.append({self.timestamp: critical_limb})

        if self.timestamp % frame == 0:
            if self.timestamp != 0:
                self.critical_poses.append(self.critical_pose)
            self.critical_pose = {
            "img": img,
            "limbs": self.all_limbs,
            "reba_score": reba_score,
            "critical_limbs": critical_limb
        }

        ## replaces img in the span of the 100 frames with a new img if has a higher reba score
        if reba_score > self.critical_pose["reba_score"]:
            self.critical_pose = {
            "img": img,
            "limbs": self.all_limbs,
            "reba_score": reba_score,
            "critical_limbs": self.critical_limbs[self.timestamp]
        }

    def process_reba_score(self, reba_score):
        """
        Saves each REBA score and determines if it is the highest score
        """
        ## stores each frames reba score
        self.reba_score = reba_score
        self.count += 1

        self.total_reba_score += reba_score
        self.average_reba_score = self.total_reba_score / self.count

    def process_stats(self, reba_score, upperarm, lowerarm, trunk, leg, neck, wrist):
        """
        Processes the REBA score and each limb and categorizes it into good, fair, or poor
        """
        if reba_score < 3:
            self.reba_stats["good"] += 1
        elif reba_score < 5:
            self.reba_stats["fair"] += 1
        else:
            self.reba_stats["poor"] += 1

        if upperarm < 3:
            self.upper_arm_stats["good"] += 1
        elif upperarm < 4:
            self.upper_arm_stats["fair"] += 1
        else:
            self.upper_arm_stats["poor"] += 1

        if lowerarm < 2:
            self.lower_arm_stats["good"] += 1
        else:
            self.lower_arm_stats["poor"] += 1

        if trunk < 2:
            self.trunk_stats["good"] += 1
        elif trunk < 3:
            self.trunk_stats["fair"] += 1
        else:
            self.trunk_stats["poor"] += 1

        if leg < 2:
            self.leg_stats["good"] += 1
        elif leg < 3:
            self.leg_stats["fair"] += 1
        else:
            self.leg_stats["poor"] += 1

        if neck < 2:
            self.neck_stats["good"] += 1
        else:
            self.neck_stats["poor"] += 1

        if wrist < 2:
            self.wrist_stats["good"] += 1
        else:
            self.wrist_stats["poor"] += 1

    def process_all_stats(self):
        """
        Processes all stats (REBA, upper arm, lower arm, etc.) into percentages and returns a dictionary.
        """
        def stat_num_to_percent(stat_dict):
            """
            Converts the number of good, fair, and poor scores to percentages.
            """
            total = sum(stat_dict.values())
            if total == 0:  # Avoid division by zero
                return {key: 0 for key in stat_dict.keys()}
            return {key: round((value / total) * 100) for key, value in stat_dict.items()}

        processed_stats = {
            "reba_stats": stat_num_to_percent(self.reba_stats),
            "upper_arm_stats": stat_num_to_percent(self.upper_arm_stats),
            "lower_arm_stats": stat_num_to_percent(self.lower_arm_stats),
            "trunk_stats": stat_num_to_percent(self.trunk_stats),
            "leg_stats": stat_num_to_percent(self.leg_stats),
            "neck_stats": stat_num_to_percent(self.neck_stats),
            "wrist_stats": stat_num_to_percent(self.wrist_stats),
        }
        return processed_stats

    def calculate_score(self, limb_stats):
        """
        Calculates the score based on the formula:
        Score = Poor Percentage Average + 0.5 * Fair Percentage Average
        Score is capped between 1 and 10.
        """
        fair_percentage = limb_stats.get('fair', 0)
        poor_percentage = limb_stats.get('poor', 0)

        # Calculate score
        score = poor_percentage + (0.5 * fair_percentage)

        # Cap the score between 1 and 10
        if score < 20:
            score = 1
        else:
            score = int(str(score)[0])
        return score

    def process_all_limb_scores(self, processed_stats):
        """
        Processes the percentages from the processed_stats dictionary and assigns a score (1-10) to each limb.
        """
        limb_scores = {
            "upper_arm_score": self.calculate_score(processed_stats["upper_arm_stats"]),
            "lower_arm_score": self.calculate_score(processed_stats["lower_arm_stats"]),
            "trunk_score": self.calculate_score(processed_stats["trunk_stats"]),
            "leg_score": self.calculate_score(processed_stats["leg_stats"]),
            "neck_score": self.calculate_score(processed_stats["neck_stats"]),
            "wrist_score": self.calculate_score(processed_stats["wrist_stats"]),
        }
        return limb_scores

    def filter_critical_poses(self, uuid):
        """
        - Filters out the critical poses that have a low REBA score
        - also saves images
        """
        uuid1 = uuid
        if self.critical_poses != 0:
            self.critical_poses = [pose for pose in self.critical_poses if pose["reba_score"] > 3]
            for idx, pose in enumerate(self.critical_poses):
                cv2.imwrite(f"../client/public/{uuid1}{idx}.png", pose["img"])
                pose["img"] = f"{uuid1}{idx}.png"
    
    def live_limbs(self):
        """
        Tracks the highest recorded angle for each limb and returns a score based on the angle.
        """
        self.highest_angles = {
            "upper_arm": 0,
            "lower_arm": 0,
            "trunk": 0,
            "neck": 0,
            "leg": 0,
            "wrist": 0
        }

        # Assuming self.all_limbs contains limb angle data per frame
        for limb, current_angle in self.all_limbs.items():
        # Update the highest angle if the current one is greater
            if current_angle > self.highest_angles[limb]:
                self.highest_angles[limb] = current_angle
        
        # Calculate score based on the highest recorded angles
        scores = {}
        for limb, highest_angle in self.highest_angles.items():
            if highest_angle < 30:
                score = 1
            elif highest_angle < 60:
                score = 3
            elif highest_angle < 90:
                score = 5
            elif highest_angle < 120:
                score = 7
            else:
                score = 9
            scores[limb] = score
        
        return scores