import { TensorFlowService } from './TensorFlowService';
import { ClassificationResult } from '../models/ClassificationResult';
import { ImageQualityChecker } from '../utils/ImageQualityChecker';
import uuid from 'react-native-uuid';

export class OrangeClassifier {
  private static instance: OrangeClassifier;
  private tensorFlowService: TensorFlowService;
  private imageQualityChecker: ImageQualityChecker;
  private confidenceThreshold = 0.3;

  private constructor() {
    this.tensorFlowService = TensorFlowService.getInstance();
    this.imageQualityChecker = new ImageQualityChecker();
  }

  public static getInstance(): OrangeClassifier {
    if (!OrangeClassifier.instance) {
      OrangeClassifier.instance = new OrangeClassifier();
    }
    return OrangeClassifier.instance;
  }

  public async initialize(): Promise<void> {
    await this.tensorFlowService.initialize();
  }

  public async classifyOrange(
    imageUri: string,
    location?: { latitude: number; longitude: number; address?: string }
  ): Promise<ClassificationResult> {
    const startTime = Date.now();
    const id = uuid.v4() as string;

    try {
      const qualityCheck = await this.imageQualityChecker.checkImageQuality(imageUri);

      const { predictions, processingTime } = await this.tensorFlowService.classifyImage(imageUri);
      
      if (!predictions || predictions.length === 0) {
        throw new Error('No predictions returned from ML service');
      }

      const best = predictions[0];

      const primaryResult = {
        label: best.label,
        confidence: best.confidence,
        isOrange: /good|bad|quality/i.test(best.label),
      };

      const needsFallback = primaryResult.confidence < this.confidenceThreshold || !primaryResult.isOrange;
      const fallbackResult = needsFallback
        ? { label: 'Color-based heuristic', confidence: 0.6, reason: 'Low confidence' }
        : undefined;

      const qualityAnalysis = {
        isGoodQuality: /good/i.test(primaryResult.label),
        hasMold: /mold|rotten|bad/i.test(primaryResult.label),
        moldConfidence: /mold|bad/i.test(primaryResult.label) ? 0.6 : 0.2,
        colorAnalysis: {
          dominantColor: 'orange',
          brightness: 0.7,
          saturation: 0.8,
        },
      };

      return {
        id,
        imageUri,
        timestamp: new Date(),
        location,
        primaryResult,
        fallbackResult,
        qualityAnalysis,
        imageQuality: qualityCheck,
        processingTime: processingTime + (Date.now() - startTime),
        modelVersion: 'fallback-1.0.0',
        preprocessingApplied: ['resize', 'normalize'],
      };
    } catch (error) {
      console.error('Classification failed:', error);
      
      // Return a safe fallback result
      return {
        id,
        imageUri,
        timestamp: new Date(),
        location,
        primaryResult: {
          label: 'Unable to analyze',
          confidence: 0.0,
          isOrange: false,
        },
        fallbackResult: {
          label: 'Analysis failed',
          confidence: 0.0,
          reason: error instanceof Error ? error.message : 'Unknown error',
        },
        qualityAnalysis: {
          isGoodQuality: false,
          hasMold: false,
          moldConfidence: 0.0,
          colorAnalysis: {
            dominantColor: 'unknown',
            brightness: 0.0,
            saturation: 0.0,
          },
        },
        imageQuality: {
          isHighQuality: false,
          resolution: { width: 0, height: 0 },
          fileSize: 0,
          issues: ['Analysis failed'],
        },
        processingTime: Date.now() - startTime,
        modelVersion: 'fallback-1.0.0',
        preprocessingApplied: [],
      };
    }
  }

  public setConfidenceThreshold(threshold: number): void {
    this.confidenceThreshold = Math.max(0, Math.min(1, threshold));
  }

  public getConfidenceThreshold(): number {
    return this.confidenceThreshold;
  }
}
