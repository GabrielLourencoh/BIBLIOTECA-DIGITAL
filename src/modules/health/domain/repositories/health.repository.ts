export abstract class HealthRepository {
  abstract checkDatabaseConnection(): Promise<boolean>;
}
