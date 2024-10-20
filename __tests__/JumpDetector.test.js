import { expect, test, describe, beforeEach, afterEach, jest } from '@jest/globals';
import { JumpDetector } from '../components/JumpDetector';
import { JumpMetrics } from '../components/JumpMetrics';

jest.mock('../components/JumpMetrics');

describe('JumpDetector', () => {
    let jumpDetector;
    let mockJumpMetrics;

    beforeEach(() => {
        mockJumpMetrics = new JumpMetrics();
        JumpMetrics.mockImplementation(() => mockJumpMetrics);
        jumpDetector = new JumpDetector();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should initialize with default values', () => {
        expect(jumpDetector.jumpMetrics).toBe(mockJumpMetrics);
    });

    test('should detect take-off and landing', () => {
        const takeoffData = { x: 0, y: 0, z: 0.5, timestamp_s: 1 };
        const landingData = { x: 0, y: 0, z: 1.5, timestamp_s: 2 };

        // Initially grounded
        expect(jumpDetector.previousState).toBe('grounded');

        jumpDetector.pushSensorData(takeoffData);
        expect(jumpDetector.previousState).toBe('airborne');
        expect(jumpDetector.t_takeoff_s).toBe(1);

        jumpDetector.pushSensorData(landingData);
        expect(jumpDetector.previousState).toBe('grounded');
        expect(mockJumpMetrics.addJump).toHaveBeenCalledWith(
            expect.any(Number),
            expect.any(Number),
            1
        );
    });

    test('should update horizontal velocity and displacement during flight', () => {
        const takeoffData = { x: 0, y: 0, z: 0.5, timestamp_s: 1 };
        const flightData = { x: 0.1, y: 0.1, z: 0, timestamp_s: 1.5 };

        jumpDetector.pushSensorData(takeoffData);
        jumpDetector.pushSensorData(flightData);

        expect(jumpDetector.v_horizontal_m).toEqual(expect.any(Array));
        expect(jumpDetector.s_horizontal_m).toEqual(expect.any(Array));
    });

    test('should return jump metrics', () => {
        expect(jumpDetector.getJumpMetrics()).toBe(mockJumpMetrics);
    });
});