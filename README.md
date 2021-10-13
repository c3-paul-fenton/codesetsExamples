# CodeSets Example Repository

# Prerequisites

* Docker
* Tunnelblick VPN (turned on during docker builds)
* node.js (npm)
* `curlAll` utility installed on your PATH
* c3 cli (c3server on your PATH)


# Get the Data from OneDrive

Get the following .zip and extract into `metricsTestRepo/codesets/data`:
[.zip on OneDrive](https://c3e-my.sharepoint.com/:f:/g/personal/sharedfolders_c3iot_com/Erw2ibrYSmBMgOVZdPmeRSsBlACLjgySEouyQmDRoDEB0w?e=ohB1BI)

The resulting folder structure should look like below:
```
data/
├── CanonicalBiometricMeasurement/
│   └── inbox/
│       └── blood_pressure_codes4.csv
└── CanonicalCodeAlias/
    └── inbox/
        └── CanonicalCodeAlias2.csv
```

# Run Locally for the First Time

```
npm run up
```

Wait for the webserver to become accessible at `localhost:8080/static/console`

```
npm run prov
npm run curl
```

# Shutdown
```
npm run down
```

# Storyline for demo

Console commands:
```javascript
// View the updated set of code alias mappings, note the v2 updates for BloodPressureApp (switching from BP2 to BP3)
c3Grid(CodeAlias.fetch());

// Scenario 1: Consider InsightTask=GeneralHealthApp
TenantConfig.upsert({ id: "globalInsightTask", value: "GeneralHealthApp" });
var GeneralHealthApp = EvalMetricsSpec.make({
    "ids": ["paulyip"],
    "start": "2021-09-01",
    "end": "2021-10-01",
    "interval": "DAY",
    "expressions": ["MeasurementsAvg", "MeasurementCode_BP1", "MeasurementCode_BP2"],
    "bindings": {
        "aliasFilter": "SystolicBP",
        "versionFilter": "v1"
    }
});
c3Viz(Patient.evalMetricsWithMetadata(GeneralHealthApp, []));


// Scenario 2: Consider InsightTask=BloodPressureApp
TenantConfig.upsert({ id: "globalInsightTask", value: "BloodPressureApp" });
var BloodPressureApp = EvalMetricsSpec.make({
    "ids": ["paulyip"],
    "start": "2021-09-01",
    "end": "2021-10-01",
    "interval": "DAY",
    "expressions": ["MeasurementsAvg", "MeasurementCode_BP1", "MeasurementCode_BP2"],
    "bindings": {
        "aliasFilter": "SystolicBPSeated",
        "versionFilter": "v1"
    }
});
c3Viz(Patient.evalMetricsWithMetadata(BloodPressureApp, []));

// Scenario 3: Version update for SystolicBPSeated from BP2 to BP3
TenantConfig.upsert({ id: "globalInsightTask", value: "BloodPressureApp" });
var BloodPressureApp = EvalMetricsSpec.make({
    "ids": ["paulyip"],
    "start": "2021-09-01",
    "end": "2021-10-01",
    "interval": "DAY",
    "expressions": ["MeasurementsAvg", "MeasurementCode_BP2", "MeasurementCode_BP3"],
    "bindings": {
        "aliasFilter": "SystolicBPSeated",
        "versionFilter": "v2"
    }
});
c3Viz(Patient.evalMetricsWithMetadata(BloodPressureApp, []));
```