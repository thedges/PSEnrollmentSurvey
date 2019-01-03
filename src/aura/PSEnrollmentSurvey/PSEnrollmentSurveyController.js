({
	doInit : function(component, event, helper) {
        component.set("v.enrollmentId", component.get("v.recordId"));
        helper.getProgramEnrollment(component);
        helper.getExistingSurveyInvitation(component);
		helper.getSurveys(component);
	},
    onSurveyChange : function(component, event, helper) {
		console.log("onSurveyChange...");
        var surveyId = component.get("v.surveyId");
        var surveyList = component.get("v.surveyList");
        
        var i;
        for (i = 0; i < surveyList.length; i++) { 
          if (surveyList[i].Id == surveyId)
          {
              component.set("v.surveyName", surveyList[i].Name);
          }
        }
        
	},
    generateSurvey : function(component, event, helper) {
		console.log("generateSurvey...");
        helper.generateSurveyLink(component);
        
	}
})