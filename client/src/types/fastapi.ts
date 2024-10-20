export interface FastAPIResponse {
    message:          string;
    critical_frames:  CriticalFrame[];
    video_reba_score: number;
    percentages:      Percentages;
    total_frames:     number;
}

export interface CriticalFrame {
    img:             string;
    reba_score:      number;
    critical_limbs?: { [key: string]: CriticalLimb[] };
    critical_libs?:  CriticalLIB[];
}

export interface CriticalLIB {
    lower_arm: number;
}

export interface CriticalLimb {
    trunk?:     number;
    lower_arm?: number;
    upper_arm?: number;
}

export interface Percentages {
    reba_stats:      Stats;
    upper_arm_stats: Stats;
    lower_arm_stats: Stats;
    trunk_stats:     Stats;
    leg_stats:       Stats;
    neck_stats:      Stats;
    wrist_stats:     Stats;
}

export interface Stats {
    good: number;
    fair: number;
    poor: number;
}
