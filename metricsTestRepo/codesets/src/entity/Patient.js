/*
* Patient.js - Augmented metrics evaluation functions to insert Insight Task bindings by default
*/
function evalMetric(spec) {
    return c3Super(addDefaultInsightTaskToSpec(spec));
}

function evalMetrics(spec) {
    return c3Super(addDefaultInsightTaskToSpec(spec));
}

function evalMetricsWithMetadata(spec, overrideMetrics) {
    return c3Super(addDefaultInsightTaskToSpec(spec), overrideMetrics);
}

/*
* Adds default binding value for the insightTaskFilter key based on the
* TenantConfig if it exists
*/
function addDefaultInsightTaskToSpec(spec) {
    if (!spec.bindings['insightTaskFilter']) {
        if (TenantConfig.get("globalInsightTask")) {
            spec.bindings['insightTaskFilter'] = TenantConfig.get("globalInsightTask").value;
        }
    }
    return spec;
}