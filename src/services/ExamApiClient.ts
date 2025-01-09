import { BaseClientService } from './baseClientService';

const ExamApiClient = BaseClientService({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || '',
  nodeEnv: process.env.NODE_ENV,
});

export default { ...ExamApiClient };
