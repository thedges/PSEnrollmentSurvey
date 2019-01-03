public class PSEnrollmentSurveyController {
  @AuraEnabled
  public static List<Survey> getSurveys()
  {
      System.debug('getSurveys...');

      try {
        List<Survey> surveyList = new List<Survey>();
        
        surveyList = [SELECT Id, Name FROM Survey ORDER BY NAME ASC];

         return surveyList;
      } catch (Exception e) {
               throw new AuraHandledException(e.getMessage());
      }
  }

  @AuraEnabled
  public static Program_Enrollment__c getProgramEnrollment(String enrollmentId)
  {
      System.debug('getProgramEnrollment...');

      try {
        List<Program_Enrollment__c> peList = [SELECT Id, Name, Contact__c  FROM Program_Enrollment__c WHERE Id = :enrollmentId];
     
        if (peList != null && peList.size() > 0)
        {    
          return peList[0];
        }
        return null;
      } catch (Exception e) {
               throw new AuraHandledException(e.getMessage());
      }
  }
    
  @AuraEnabled
  public static SurveyInvitation getExistingSurveyInvitation(String enrollmentId)
  {
      System.debug('getExistingSurveyInvitation...');

      try {
        List<SurveyInvitation> siList = [SELECT Id, Name, Survey.Id, Survey.Name, InvitationLink  FROM SurveyInvitation WHERE Program_Enrollment__c = :enrollmentId];
     
        if (siList != null && siList.size() > 0)
        {    
          return siList[0];
        }
        return null;
      } catch (Exception e) {
               throw new AuraHandledException(e.getMessage());
      }
  }
    
  @AuraEnabled
  public static String generateSurveyLink(String surveyName, String surveyId, String networkId, String contactId, String enrollmentId)
  {
      System.debug('generateSurveyLink...');
      System.debug('surveyName=' + surveyName);
      System.debug('surveyId=' + surveyId);
      System.debug('networkId=' + networkId);
      System.debug('contactId=' + contactId);
      System.debug('enrollmentId=' + enrollmentId);

      try {
        SurveyInvitation si = new SurveyInvitation();
        si.Name = surveyName + ' ' + Datetime.now().format('yyyy/MM/dd HH:mm:ss'); 
        si.SurveyId = surveyId;
        si.ParticipantId = UserInfo.getUserId();
        si.Program_Enrollment__c = enrollmentId;
        si.Participant__c = contactId;
        insert si;

        si = [SELECT Id, InvitationLink FROM SurveyInvitation WHERE Id = :si.Id LIMIT 1];
        return si.InvitationLink;
      } catch (Exception e) {
               throw new AuraHandledException(e.getMessage());
      }
  }

}