import { TypeOrmHealthIndicator } from "@nestjs/terminus";
import { Test, TestingModule } from "@nestjs/testing";
import { TerminusOptionsService as HealthService } from "./health.service";

describe("HealthService", () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        TypeOrmHealthIndicator,
        {
          provide: "",
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it("should be defined", () => expect(service).toBeDefined());

  it("createTerminusOptions", () =>
    expect(service.createTerminusOptions()).toBeDefined());
});
