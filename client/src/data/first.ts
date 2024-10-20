import type { FastAPIResponse } from '@/types/fastapi'

export default {
  message: 'Video processed successfully',
  total_frames: 384,
  critical_frames: [
    {
      img: 'temp',
      reba_score: 7,
      critical_limbs: {
        95: [
          {
            trunk: 83.05649026519137,
          },
          {
            lower_arm: 149.62512187213164,
          },
        ],
      },
    },
    {
      img: 'temp',
      reba_score: 8,
      critical_limbs: {
        103: [
          {
            trunk: 93.26501240910304,
          },
          {
            upper_arm: 93.76802678803067,
          },
          {
            lower_arm: 146.89716811803336,
          },
        ],
      },
    },
  ],
  video_reba_score: 2.5613577023498695,
  percentages: {
    reba_stats: {
      good: 72,
      fair: 6,
      poor: 22,
    },
    upper_arm_stats: {
      good: 76,
      fair: 13,
      poor: 11,
    },
    lower_arm_stats: {
      good: 38,
      fair: 0,
      poor: 62,
    },
    trunk_stats: {
      good: 58,
      fair: 8,
      poor: 34,
    },
    leg_stats: {
      good: 85,
      fair: 15,
      poor: 0,
    },
    neck_stats: {
      good: 84,
      fair: 0,
      poor: 16,
    },
    wrist_stats: {
      good: 70,
      fair: 0,
      poor: 30,
    },
  },
  limb_scores: {
    upper_arm_score: 1,
    lower_arm_score: 6,
    trunk_score: 3,
    leg_score: 1,
    neck_score: 3,
    wrist_score: 1,
  },
} as FastAPIResponse