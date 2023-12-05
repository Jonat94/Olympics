import { Serie } from './Serie';

/**
 * Model interface used for storing line charts data
 */
export interface LineChartData {
  name: string;
  series: Serie[];
}
