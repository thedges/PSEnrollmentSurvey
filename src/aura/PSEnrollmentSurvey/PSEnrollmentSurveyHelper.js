({
	getSurveys: function (component) {
		console.log('getSurveys invoked...');
		var self = this;
		var map = {};

		// save the case
		var action = component.get("c.getSurveys");

		action.setCallback(this, function (actionResult) {
			var state = actionResult.getState();
			if (state === "SUCCESS") {
				var resp = actionResult.getReturnValue();

				//console.log(JSON.stringify(resp));
				component.set('v.surveyList', resp);
			} else {
				self.handleErrors(component, actionResult.getError());
			}

		});
		$A.enqueueAction(action);
	},
	getProgramEnrollment: function (component) {
		console.log('getProgramEnrollment invoked...');
		var self = this;
		var map = {};

		// save the case
		var action = component.get("c.getProgramEnrollment");
        action.setParams({
            "enrollmentId": component.get("v.enrollmentId")
		});
		action.setCallback(this, function (actionResult) {
			var state = actionResult.getState();
 
			if (state === "SUCCESS") {
				var resp = actionResult.getReturnValue();

				if (resp != null)
                {
				  console.log('resp=' + JSON.stringify(resp));
                  component.set("v.contactId", resp.Contact__c);
                }
			} else {
				self.handleErrors(component, actionResult.getError());
			}

		});
		$A.enqueueAction(action);
	},
    getExistingSurveyInvitation: function (component) {
		console.log('getExistingSurveyInvitation invoked...');
		var self = this;
		var map = {};

		// save the case
		var action = component.get("c.getExistingSurveyInvitation");
        action.setParams({
            "enrollmentId": component.get("v.enrollmentId")
		});
		action.setCallback(this, function (actionResult) {
			var state = actionResult.getState();
 
			if (state === "SUCCESS") {
				var resp = actionResult.getReturnValue();

				if (resp != null)
                {
				console.log('resp=' + JSON.stringify(resp));
                  component.set("v.surveyName", resp.Survey.Name);
                  component.set("v.surveyId", resp.Survey.Id);
				  component.set('v.surveyInvitationLink', resp.InvitationLink);
                }
			} else {
				self.handleErrors(component, actionResult.getError());
			}

		});
		$A.enqueueAction(action);
	},
    generateSurveyLink: function (component) {
		console.log('generateSurveyLink invoked...');
		var self = this;
		var map = {};

		// save the case
		var action = component.get("c.generateSurveyLink");
        action.setParams({
			"surveyName": component.get("v.surveyName"),
			"surveyId": component.get("v.surveyId"),
            "networkId": component.get("v.networkId"),
            "contactId": component.get("v.contactId"),
            "enrollmentId": component.get("v.enrollmentId")
		});


		action.setCallback(this, function (actionResult) {
			var state = actionResult.getState();
			if (state === "SUCCESS") {
				var resp = actionResult.getReturnValue();

				console.log('resp=' + resp);
				component.set('v.surveyInvitationLink', resp);
				$A.get('e.force:refreshView').fire();
			} else {
				self.handleErrors(component, actionResult.getError());
			}

		});
		$A.enqueueAction(action);
	},

	handleErrors: function (component, errors) {
		// Configure error toast
		let toastParams = {
			title: "Error!",
			message: "Unknown error", // Default error message
			type: "error",
			mode: "sticky"
		};
		// Pass the error message if any
		if (errors && Array.isArray(errors) && errors.length > 0) {
			toastParams.message = errors[0].message;
		}
		else
		{
			toastParams.message = errors;
		}
		// Fire error toast
		let toastEvent = $A.get("e.force:showToast");
		toastEvent.setParams(toastParams);
		toastEvent.fire();

	}
})