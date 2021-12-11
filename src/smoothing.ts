export const cubic = (t:number) => {
    if (t < 0) return 0;
    if (t > 1) return 1;
    
    // Compute cubic Bezier Curve y(t) with control points (0, 0) (0.5, 0) (0.5, 1) and (1, 1)
    const dt = 1 - t;
    return 1.5 * (dt**2 * t + dt * t**2) + t**3;
}