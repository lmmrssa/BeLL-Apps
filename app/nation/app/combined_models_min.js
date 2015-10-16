$(function(){App.Models.Community=Backbone.Model.extend({idAttribute:"_id",url:function(){if(_.has(this,"id"))var a=_.has(this.toJSON(),"_rev")?App.Server+"/community/"+this.id+"?rev="+this.get("_rev"):App.Server+"/community/"+this.id;else var a=App.Server+"/community";return a},defaults:{kind:"Community",lastAppUpdateDate:" - ",version:" - ",lastActivitiesSyncDate:" - ",lastPublicationsSyncDate:" - "},schema:{Name:{type:"Text",validators:["required"]},Code:{type:"Text",validators:["required"]},Url:{type:"Text",validators:["required"]},SponserName:{type:"Text",validators:["required"]},SponerAddress:{type:"Text",validators:["required"]},ContactFirstname:{type:"Text",validators:["required"]},ContactMiddlename:{type:"Text",validators:["required"]},ContactLastname:{type:"Text",validators:["required"]},ContactPhone:{type:"Text",validators:["required"]},ContactEmail:{type:"Text",validators:["required"]},SuperManagerFirstname:{type:"Text",validators:["required"]},SuperManagerMiddlename:{type:"Text",validators:["required"]},SuperManagerLastname:{type:"Text",validators:["required"]},SuperManagerPhone:{type:"Text",validators:["required"]},SuperManagerEmail:{type:"Text",validators:["required"]},LeaderId:{type:"Text",validators:["required"]},LeaderPassword:{type:"Text",validators:["required"]},LeaderEmail:{type:"Text",validators:["required"]},UrgentName:{type:"Text",validators:["required"]},UrgentPhone:{type:"Text",validators:["required"]},AuthName:{type:"Text",validators:["required"]},AuthDate:{type:"Text",validators:["required"]}}})}),$(function(){App.Models.Configuration=Backbone.Model.extend({idAttribute:"_id",url:function(){if(_.has(this,"id"))var a=_.has(this.toJSON(),"_rev")?App.Server+"/configurations/"+this.id+"?rev="+this.get("_rev"):App.Server+"/configurations/"+this.id;else var a=App.Server+"/configurations";return a},defaults:{currentLanguage:{type:"Text"}},schema:{name:{type:"Text",validators:["required"]},code:{type:"Text",validators:["required"]},type:{type:"Select",options:["community","nation"],validators:["required"]},nationName:{type:"Text",validators:["required"]},nationUrl:{type:"Text",validators:["required"]},version:{type:"Text"},notes:{type:"Text"},selectLanguage:{type:"Select",options:["Arabic","Asante","Chinese","English","Ewe","French","Hindi","Kyrgyzstani","Nepali","Portuguese","Punjabi","Russian","Somali","Spanish","Swahili","Urdu"]}}})}),$(function(){App.Models.CourseStep=Backbone.Model.extend({idAttribute:"_id",url:function(){if(_.has(this,"id"))var a=_.has(this.toJSON(),"_rev")?App.Server+"/coursestep/"+this.id+"?rev="+this.get("_rev"):App.Server+"/coursestep/"+this.id;else var a=App.Server+"/coursestep";return a},defaults:{kind:"Course Step"},schema:{title:{type:"Text",validators:["required"]},stepMethod:"Text",description:{type:"TextArea",validators:["required"]},stepGoals:"TextArea",step:"Text",courseId:"Text",resourceId:{type:"Select",options:[]},questions:{type:"Select",options:[]},qoptions:{type:"Select",options:[]},answers:{type:"Select",options:[]},resourceTitles:{type:"Select",options:[]},allowedErrors:{type:"Text",validators:["required"]},outComes:{title:"Outcomes",type:"Checkboxes",options:["Paper","Quiz"]},passingPercentage:{type:"Select",options:[10,20,30,40,50,60,70,80,90,100]}},saveAttachment:function(a,b,c){var d=App.Server,e="coursestep",f=this.get("_id")?this.get("_id"):this.get("id"),g=this;$.couch.db(e).openDoc(f,{success:function(b){$(c).val(g.get("_rev")),$(a).ajaxSubmit({url:d+"/"+e+"/"+f,success:function(a){g.trigger("savedAttachment")}})},error:function(b){$.couch.db(e).saveDoc({_id:f},{success:function(b){$(c).val(b.rev),$(a).ajaxSubmit({url:"/"+e+"/"+f,success:function(a){console.log("file submitted successfully"),g.trigger("savedAttachment")}})}})}})}})}),$(function(){App.Models.Credentials=Backbone.Model.extend({idAttribute:"_id",schema:{login:{type:"Text",validators:["required"]},password:{type:"Password",validators:["required"]}}})}),$(function(){App.Models.DailyLog=Backbone.Model.extend({idAttribute:"_id",url:function(){if(_.has(this,"id"))var a=_.has(this.toJSON(),"_rev")?App.Server+"/activitylog/"+this.id+"?rev="+this.get("_rev"):App.Server+"/activitylog/"+this.id;else var a=App.Server+"/activitylog";return a},schema:{male_deleted_count:"number",female_deleted_count:"number",logDate:"Text",female_visits:"number",male_visits:"number",female_new_signups:"number",male_new_signups:"number",resourcesIds:[],female_rating:[],female_timesRated:[],male_rating:[],male_timesRated:[],resources_opened:[],resources_names:[],female_opened:[],male_opened:[]}})}),$(function(){App.Models.Group=Backbone.Model.extend({idAttribute:"_id",url:function(){if(_.has(this,"id"))var a=_.has(this.toJSON(),"_rev")?App.Server+"/groups/"+this.id+"?rev="+this.get("_rev"):App.Server+"/groups/"+this.id;else var a=App.Server+"/groups";return a},defaults:{kind:"Group"},schema:{CourseTitle:"Text",languageOfInstruction:"Text",memberLimit:"Text",courseLeader:{type:"Select",options:null},description:"TextArea",method:"Text",gradeLevel:{type:"Select",options:["Pre-K","K","1","2","3","4","5","6","7","8","9","10","11","12","College","Post-Grad"]},subjectLevel:{type:"Select",options:["Beginner","Intermediate","Advanced","Expert"]},startDate:"Text",endDate:"Text",frequency:{type:"Radio",options:["Daily","Weekly"]},Day:{type:"Checkboxes",options:["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]},startTime:"Text",endTime:"Text",location:"Text",backgroundColor:"Text",foregroundColor:"Text",members:{type:"Checkboxes",options:null}}})}),$(function(){App.Models.Member=Backbone.Model.extend({idAttribute:"_id",url:function(){if(_.has(this,"id"))var a=_.has(this.toJSON(),"_rev")?App.Server+"/members/"+this.id+"?rev="+this.get("_rev"):App.Server+"/members/"+this.id;else var a=App.Server+"/members";return a},defaults:{kind:"Member",roles:["Learner"]},toString:function(){return this.get("login")+": "+this.get("firstName")+" "+this.get("lastName")},schema:{firstName:{validators:["required"]},lastName:{validators:["required"]},middleNames:"Text",login:{validators:["required"]},password:{validators:["required"]},phone:"Text",email:"Text",language:"Text",BirthDate:"Date",visits:"Text",Gender:{type:"Select",options:["Male","Female"]},levels:{type:"Select",options:["1","2","3","4","5","6","7","8","9","10","11","12","Higher"]},status:"Text",yearsOfTeaching:{type:"Select",options:["None","1 to 20","More than 20"]},teachingCredentials:{type:"Select",options:["Yes","No"]},subjectSpecialization:"Text",forGrades:{type:"Checkboxes",options:["Pre-k","Grades(1-12)","Higher Education","Completed Higer Education","Masters","Doctrate","Other Professional Degree"]}},saveAttachment:function(a,b,c){var d=App.Server,e="members",f=this.get("_id")?this.get("_id"):this.get("id"),g=this;$.couch.db(e).openDoc(f,{success:function(b){_.has(b,"_attachments")?$.ajax({url:"/members/"+b._id+"/"+_.keys(b._attachments)[0]+"?rev="+b._rev,type:"DELETE",success:function(b,h,i){b=JSON.parse(b),$(c).val(b.rev),$(a).ajaxSubmit({url:d+"/"+e+"/"+f,success:function(a){g.trigger("savedAttachment")}})}}):($(c).val(g.get("rev")),$(a).ajaxSubmit({url:d+"/"+e+"/"+f,success:function(a){g.trigger("savedAttachment")}}))},error:function(b){$.couch.db(e).saveDoc({_id:f},{success:function(b){$(c).val(b.rev),$(a).ajaxSubmit({url:"/"+e+"/"+f,success:function(a){console.log("file submitted successfully"),g.trigger("savedAttachment")}})}})}})}})}),$(function(){App.Models.NationReport=Backbone.Model.extend({idAttribute:"_id",url:function(){if(_.has(this,"id"))var a=_.has(this.toJSON(),"_rev")?App.Server+"/nationreports/"+this.id+"?rev="+this.get("_rev"):App.Server+"/nationreports/"+this.id;else var a=App.Server+"/nationreports";return a},defaults:{kind:"NationReport"},schema:{title:"Text",author:"Text",Date:"Date"},saveAttachment:function(a,b,c){var d=App.Server,e="nationreports",f=this.get("_id")?this.get("_id"):this.get("id"),g=this;$.couch.db(e).openDoc(f,{success:function(b){_.has(b,"_attachments")?$.ajax({url:"/nationreports/"+b._id+"/"+_.keys(b._attachments)[0]+"?rev="+b._rev,type:"DELETE",success:function(b,h,i){b=JSON.parse(b),$(c).val(b.rev),$(a).ajaxSubmit({url:d+"/"+e+"/"+f,success:function(a){g.trigger("savedAttachment")}})}}):($(c).val(g.get("rev")),$(a).ajaxSubmit({url:d+"/"+e+"/"+f,success:function(a){alert("Successfully Saved!"),g.trigger("savedAttachment"),Backbone.history.navigate("reports",{trigger:!0})},error:function(a){alert("Error")}}))},handleError:function(a,b,c,d){a.error&&a.error.call(a.context||window,b,c,d),a.global&&(a.context?jQuery(a.context):jQuery.event).trigger("ajaxError",[b,a,d])},error:function(b){$.couch.db(e).saveDoc({_id:f},{success:function(b){alert("error success"),$(c).val(b.rev),$(a).ajaxSubmit({url:"/"+e+"/"+f,success:function(a){console.log("file submitted successfully"),g.trigger("savedAttachment")}})}})}})}})}),$(function(){App.Models.NationReportComment=Backbone.Model.extend({idAttribute:"_id",url:function(){if(_.has(this,"id"))var a=_.has(this.toJSON(),"_rev")?App.Server+"/nationreports/"+this.id+"?rev="+this.get("_rev"):App.Server+"/nationreports/"+this.id;else var a=App.Server+"/nationreports";return a},defaults:{kind:"NationReportComment"},schema:{NationReportId:"Text",commentNumber:"Text",comment:"TextArea",memberLogin:"Text",time:"Text"}})}),$(function(){App.Models.Publication=Backbone.Model.extend({idAttribute:"_id",url:function(){if(_.has(this,"id"))var a=_.has(this.toJSON(),"_rev")?App.Server+"/publications/"+this.id+"?rev="+this.get("_rev"):App.Server+"/publications/"+this.id;else var a=App.Server+"/publications";return a},defaults:{kind:"publication",communityNames:[]},schema:{Date:"Text",IssueNo:"Number",editorName:"Text",editorEmail:"Text",editorPhone:"Text",resources:{type:"Select",options:[]}}}),App.Models.sendPublication=Backbone.Model.extend({idAttribute:"_id",url:function(){if(_.has(this,"id"))var a=_.has(this.toJSON(),"_rev")?App.Server+"/publicationdistribution/"+this.id+"?rev="+this.get("_rev"):App.Server+"/publicationdistribution/"+this.id;else var a=App.Server+"/publicationdistribution";return a}})}),$(function(){App.Models.Resource=Backbone.Model.extend({idAttribute:"_id",url:function(){if(_.has(this,"id"))var a=_.has(this.toJSON(),"_rev")?App.Server+"/resources/"+this.id+"?rev="+this.get("_rev"):App.Server+"/resources/"+this.id;else var a=App.Server+"/resources";return a},defaults:{kind:"Resource"},schema:{title:"Text",author:{title:"Author/Editor",type:"Text"},Publisher:"Text",language:{type:"Select",options:[{val:"Arabic",label:"Arabic"},{val:"Asante",label:"Asante"},{val:"Chinese",label:"Chinese"},{val:"English",label:"English"},{val:"Ewe",label:"Ewe"},{val:"French",label:"French"},{val:"Hindi",label:"Hindi"},{val:"Kyrgyzstani",label:"Kyrgyzstani"},{val:"Nepali",label:"Nepali"},{val:"Portuguese",label:"Portuguese"},{val:"Punjabi",label:"Punjabi"},{val:"Russian",label:"Russian"},{val:"Somali",label:"Somali"},{val:"Spanish",label:"Spanish"},{val:"Swahili",label:"Swahili"},{val:"Urdu",label:"Urdu"}]},Year:"Text",subject:{title:"Subjects",type:"Select",options:["Agriculture","Arts","Business and Finance","Environment","Food and Nutrition","Geography","Health and Medicine","History","Human Development","Languages","Law","Learning","Literature","Math","Music","Politics and Government","Reference","Religion","Science","Social Sciences","Sports","Technology"]},Level:{title:"Levels",type:"Select",options:["All","Early Education","Lower Primary","Upper Primary","Lower Secondary","Upper Secondary","Undergraduate","Graduate","Professional"]},Tag:{title:"Collection",type:"Select",options:["Add New"]},Medium:{type:"Select",options:["Text","Graphic/Pictures","Audio/Music/Book ","Video"]},openWith:{type:"Select",options:["Just download","HTML","PDF.js","Flow Video Player","BeLL Video Book Player","Native Video"]},uploadDate:"Date",averageRating:"Text",articleDate:{title:"Date Added to Library",type:"Date"},addedBy:"Text"}})}),$(function(){App.Models.report=Backbone.Model.extend({idAttribute:"_id",url:function(){if(_.has(this,"id"))var a=_.has(this.toJSON(),"_rev")?App.Server+"/report/"+this.id+"?rev="+this.get("_rev"):App.Server+"/report/"+this.id;else var a=App.Server+"/report";return a},defaults:{kind:"report"},schema:{PageUrl:"Text",comment:"TextArea",Resolved:"Text",category:{type:"Select",options:["Bug","Question","Suggestion"]},priority:{type:"Checkboxes",options:["urgent"]},memberLogin:"Text",time:"Text"}})}),$(function(){App.Models.request=Backbone.Model.extend({idAttribute:"_id",url:function(){if(_.has(this,"id"))var a=_.has(this.toJSON(),"_rev")?App.Server+"/requests/"+this.id+"?rev="+this.get("_rev"):App.Server+"/requests/"+this.id;else var a=App.Server+"/requests";return a},defaults:{kind:"request"},schema:{senderId:"Text",status:"Text",sendFrom:"Text",sendFromName:"Text",request:"TextArea",response:"TextArea",type:"Text",date:"Text"}})});