﻿window.load = function () {
    Android.onPageLoadStart();
}
window.onload = function () {
    Android.onPageLoadComplete();
}
function loaderStart() {
    Android.onPageLoadStart();
}
function loaderStop() {
    Android.onPageLoadComplete();
}
window.onerror = stoperror();

function stoperror() {
    return true;
}

function NumberOnly() {
    var AsciiValue = event.keyCode
    if ((AsciiValue >= 48 && AsciiValue <= 57) || (AsciiValue == 8 || AsciiValue == 127))
        event.returnValue = true;
    else
        event.returnValue = false;
}

var ConId;
var Campaign;

$(document).ready(function () {
//16-10-2019
//    ReadConfigSettings();
//    var key = document.getElementById("lblCampaignDetailcode").value;
//    GetAgentCallingExtension();
//    var ws_servers = 'wss://49.248.16.102/voitekk/wss',
//        uri = 'sip:@49.248.16.102:5060',
//        agent_id = document.getElementById("txtagentid").value;
//    console.toString(agent_id);
//    phonestart(agent_id, ws_servers, uri);

//    alert(phonestart);
    var table = $("#example").DataTable();
    var Chk = getCookie('typevalue');
    if (Chk == 'M') {
        Android.isBackClicked(true, "http://oe.mteducare.com/oe_crm/Dashboard.aspx");
    }

//    alert('test1');
    CampaignFillmultiple();
    InteractedRelFill();
    FollowupStatusFill();
    Lost_Followup_Reasons();
    Followup_Remark_Conclusion();
    controlVisiblity('CampaignDetail');

    $('#btngetmorecampaign').click(function () {   //To save data in convert to lead div
        var campaignid = $("#ddlcampaignmultiple").val();
        ViewCampaignCountData(campaignid);
    });

    $("#callStartBtn").click(function () {
        document.getElementById('txtcallingflag').value = 1;
        callStart();
    });

    $("#callStartBtn1").click(function () {
        document.getElementById('txtcallingflag').value = 2;
        callStart();
    });

    $("#callStartBtn2").click(function () {
        document.getElementById('txtcallingflag').value = 3;
        callStart();
    });

    $("#btncalldispose").click(function () {
        var recordno = $("#txtrecordno").val();
        //alert(recordno);
        ViewStudentDetailModal(recordno);
    });

    $("#btnpreviousfollowup").click(function () {
        var recordno = $("#txtrecordno").val();
        //alert(recordno);
        ViewStudent_CampaignFollowup(recordno);
        ViewStudent_CampaignEventFollowup(recordno);
    });

    $("#btnCampaignDetailHome").click(function () {   //Redirecting To Dashboard Page In Search campaign div
        window.location.assign("Dashboard.aspx");
    });

    $("#btnFollowUpHome").click(function () {  //Redirecting To Result Grid From Follow Up div
        controlVisiblity('CampaignDetail');
    });

    $('#btnsavefollowup').click(function () {   //To save data in followup div
        SaveFollowupData();
    });

    $('#example').on('click', 'tr', function () {
        var name = $('td', this).eq(2).text();
        var Contacts_Id = $('td', this).eq(0).text();
        //alert(Contacts_Id);
        document.getElementById('lblstudentName').innerHTML = "Call Details of " + name;
        if (Contacts_Id == '') {
            $('#DescModal').modal("hide");
        }
        else if (Contacts_Id != '') {
            GetCallingDetails(Contacts_Id);
            $('#DescModal').modal("show");
        }
        else {

        }
        //Call Function to Bind Contact Details

    });

    $('#ddlInteractedRel').on('change', function () {
        var InteractedRel = document.getElementById("ddlInteractedRel").value;
        if (InteractedRel == "0") {
            document.getElementById('lblInteractedrel').innerHTML = "Select Interacted Rel.";
            $('[data-id="ddlInteractedRel"]').addClass('errorClass');
        }
        else {
            document.getElementById('lblInteractedrel').innerHTML = "";
            $('[data-id="ddlInteractedRel"]').addClass('sucessClass');
        }
    });

    $('#ddlFollowupStatus').on('change', function () {
        var FollowupStatus = document.getElementById("ddlFollowupStatus").value;
        if (FollowupStatus == "0") {
            document.getElementById('lblFollowupstatus').innerHTML = "Select Followup Status";
            $('[data-id="ddlFollowupStatus"]').addClass('errorClass');
        }
        else {
            document.getElementById('lblFollowupstatus').innerHTML = "";
            $('[data-id="ddlFollowupStatus"]').addClass('sucessClass');
        }

        if (this.value != '01') {
            $("#trLostFollowupReason").css('display', 'none');
            $("#trRemarkClosure").css('display', 'block');
            $("#trRemarkClosure").css('display', 'table-row');
            $("#trNextFollowupDate").css('display', 'block');
            $("#trNextFollowupDate").css('display', 'table-row');
        }
        else {
            $("#trLostFollowupReason").css('display', 'block');
            $("#trLostFollowupReason").css('display', 'table-row');
            $("#trRemarkClosure").css('display', 'none');
            $("#trNextFollowupDate").css('display', 'none');
        }
    });


});

function controlVisiblity(mode) {
    if (mode == 'AssignedCampaign') {
        $("#AssignedCampaign").css('display', 'block');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'CampaignDetail') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'block');
        $("#divCampaignCountSearch").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'CampaignCountSearch') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'block');
        $("#divCampaignData").css('display', 'block');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'Search') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'block');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'Result') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'block');
        $("#divCampaignData").css('display', 'block');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'ConvertToLead') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'block');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'ConvertToOpportunity') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'block');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'BookAdmission') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'block');
        $("#trProduct").css('display', 'none');
        $("#trFeeStructure").css('display', 'none');
        $("#divbtnSubmit").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'Save') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'block');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'Proceed') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'block');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'Back') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'block');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'FollowUp') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'block');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'none');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
    else if (mode == 'ConvertToLeadOppAdmission') {
        $("#AssignedCampaign").css('display', 'none');
        $("#AssignedCampaignDetail").css('display', 'none');
        $("#divCampaignSearch").css('display', 'none');
        $("#divCampaignData").css('display', 'none');
        $("#divConvertToLead").css('display', 'none');
        $("#divConvertToOpportunity").css('display', 'none');
        $("#divBookAdmission").css('display', 'none');
        $("#divFollowUp").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
        $("#divConvertAll").css('display', 'block');
        $("#Msg_Error").css('display', 'none');
        $("#Msg_Success").css('display', 'none');
    }
}




//Coding For Search Div End

//Coding For Campaign Page Start  
var newCampaignIdArray = [];
var newCampaignNameArray = [];

function GetSpecificCampaign(Word) {  //Get Specific campaign
    var SpecificCampaignIdArray = [];
    var SpecificCampaignNameArray = [];
    var j = 0;
    if (Word == "") {
        for (var i = 0; i < newCampaignNameArray.length; i++) {
            SpecificCampaignIdArray[i] = newCampaignIdArray[i];
            SpecificCampaignNameArray[i] = newCampaignNameArray[i];
        }
    }
    else {
        for (var i = 0; i < newCampaignNameArray.length; i++) {
            var n = newCampaignNameArray[i].includes(Word);
            if (n == true) {
                SpecificCampaignIdArray[j] = newCampaignIdArray[i];
                SpecificCampaignNameArray[j] = newCampaignNameArray[i];
                j++;
            }
        }
    }

    j = 0;
    $('#TCampaignAssigned').html('');
    for (var i = 0; i < SpecificCampaignIdArray.length; i++) {
        if (j == '0') {
            $('#TCampaignAssigned').append('<tr>');
        }
        if (j == '0') {
            $('#TCampaignAssigned').append('<td style="width:100%;"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + SpecificCampaignIdArray[i] + '"><div class="dashboard-stat blue" id="divstatblue" ><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + SpecificCampaignNameArray[i] + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td>');
            j++;
        }
        else if (j == '1') {
            $('#TCampaignAssigned').append('<td style="width:100%;"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + SpecificCampaignIdArray[i] + '"><div class="dashboard-stat purple" id="divstatpurple" ><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + SpecificCampaignNameArray[i] + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td>');
            j++;
        }
        else if (j == '2') {
            $('#TCampaignAssigned').append('<td style="width:100%; "><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + SpecificCampaignIdArray[i] + '"><div class="dashboard-stat pink2" id="divstatpink2" ><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + SpecificCampaignNameArray[i] + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td>');
            j++;
        }
        else if (j == '3') {
            $('#TCampaignAssigned').append('<td style="width:100%; "><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + SpecificCampaignIdArray[i] + '"><div class="dashboard-stat mint" id="divstatmint"><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + SpecificCampaignNameArray[i] + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td></tr>');
            j = 0;
        }
    }

}
// End of GetSpecificCampaign(Word)

function Assignedcampaign() {  //To fill grid on Campaign tile click
    waitingDialog.show('Please wait....', { dialogSize: 'sm', progressType: 'warning' });
    var UID = ReadCookie();
    var i = 0, j = 0;
    newCampaignIdArray = [];
    newCampaignNameArray = [];
    $.ajax({
        type: 'POST',
        url: "./WebMethods/Contacts.asmx/BindCampaign",
        contentType: "application/json; charset=utf-8",
        data: '{"UserId":"' + UID + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TCampaignAssigned').html('');
            $(data.d).each(function (index, obj) {
                newCampaignIdArray[j] = obj.CampaignId;
                newCampaignNameArray[j] = obj.Campaign_Name;
                j++;
                if (i == '0') {
                    $('#TCampaignAssigned').append('<tr>');
                }
                if (i == '0') {
                    $('#TCampaignAssigned').append('<td style="width:100%;"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + obj.CampaignId + '"><div class="dashboard-stat blue" id="divstatblue" ><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + obj.Campaign_Name + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td>');
                    i++;
                }
                else if (i == '1') {
                    $('#TCampaignAssigned').append('<td style="width:100%;"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + obj.CampaignId + '"><div class="dashboard-stat purple" id="divstatpurple" ><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + obj.Campaign_Name + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td>');
                    i++;
                }
                else if (i == '2') {
                    $('#TCampaignAssigned').append('<td style="width:100%; "><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + obj.CampaignId + '"><div class="dashboard-stat pink2" id="divstatpink2" ><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + obj.Campaign_Name + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td>');
                    i++;
                }
                else if (i == '3') {
                    $('#TCampaignAssigned').append('<td style="width:100%; "><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="cursor: pointer" onclick="Camapigndata(this);" data="' + obj.CampaignId + '"><div class="dashboard-stat mint" id="divstatmint"><div class="visual"> <i class="icon-groupmine_empty"></i></div> <div class="details"><div class="desc"> <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' + obj.Campaign_Name + '</div><div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div></div></div></div></div> </td></tr>');
                    i = 0;
                }

            })
            if (data.d == '') {
                waitingDialog.hide();
            }
            else {
                controlVisiblity('AssignedCampaign');
                waitingDialog.hide();
            }
            document.getElementById("lblCampaignCount").value = j.toString();
        }),
        error: (function () {
            toastr.error('Something Gone Wrong....');
            waitingDialog.hide();
        })

    });
};


function GetCampaignCountDetailsData() {      //To Bind Result Grid On Campaign Count Lable click
    var UID = ReadCookie();
    var lableflag = document.getElementById("lblCamapignflag").value;
    var PageNo = document.getElementById("lblPageNo").value;
    var campaignid = document.getElementById("lblCampaignDetailcode").value;
    var CampstudentName = document.getElementById("txtCampStudentName").value;
    var CampSchoolName = ""; //document.getElementById("txtCampSchoolName").value;
    var CampMTNMT = document.getElementById("ddlMTNMT").value;
    var CampCenter = document.getElementById("ddlCenterSearch").value;
    //var BoardName = document.getElementById("txtBoard").value;
    var ContactNo = document.getElementById("txtContactNumber").value;
    var CampStudentUID = document.getElementById("txtCampStudentUID").value;
    var InstitutionType = document.getElementById("ddlInstitutionType").value;
    var BoardId = document.getElementById("ddlBoard").value;
    var Standard = document.getElementById("ddlClassStandard").value;
    var School = document.getElementById("ddlSchoolName").value;
    var Exam = document.getElementById("ddlExam").value;
    var ExamStatus = document.getElementById("ddlExamStatus").value;
    var ExamRankFrom = document.getElementById("txtFromRank").value;
    var ExamRankTo = document.getElementById("txtToRank").value;
    var EventId = document.getElementById("ddlEvent").value;
    var Attendance = document.getElementById("ddlAttendance").value;
    var Event_FeedbackHeader_Id = document.getElementById("ddlFeedbackHeader").value;
    var Event_Feedback_Value_Id = document.getElementById("ddlFeedbackValues").value;
    var Followupstatus_Id = document.getElementById("ddlstatuslead").value;

    if (CampMTNMT == 'Select') {
        CampMTNMT = '';
    }
    console.debug('CampaignId - ' + campaignid + ' flag - ' + parseInt(lableflag) + ' UID- ' + UID + ' PageNo - ' + PageNo);

    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/GET_CONTACT_COUNT_DETAILS_BY_CAMPAIGN_ID",
        contentType: "application/json; charset=utf-8",
        data: '{"Flag":"' + parseInt(lableflag) + '","CampaignId":"' + campaignid + '","UID":"' + UID + '","StudentName":"' + CampstudentName + '","InstitutionType":"' + InstitutionType + '","CategoryType": "' + CampMTNMT + '","Centername":"' + CampCenter + '","PageNo":"' + parseInt(PageNo) + '","ContactNo":"' + ContactNo + '","Standard_Id":"' + Standard + '","School_Id":"' + School + '","Exam_Id":"' + Exam + '","Exam_Status_Id":"' + ExamStatus + '","Exam_From_Rank":"' + ExamRankFrom + '","Exam_To_Rank":"' + ExamRankTo + '","EventId":"' + EventId + '","Attendance":"' + Attendance + '","Event_FeedbackHeader_Id":"' + Event_FeedbackHeader_Id + '","Event_Feedback_Value_Id":"' + Event_Feedback_Value_Id + '","CampStudentUID":"' + CampStudentUID + '","Board_Id":"' + BoardId + '","Followupstatus":"' + Followupstatus_Id + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TCampaign').html('');
            $(data.d).each(function (index, obj) {
                if (obj.LeadFlag == '0') {
                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="ConvertToLead" onclick="ConvertToLead(this);" data="' + obj.ConAndCampaignid + '"  class="btn red"><i class="fa fa-leaf" data-toggle="tooltip"  data-placement="bottom" title="Convert To Lead"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Campaign</label></br><a id="ConvertToLead" onclick="ConvertToLead(this);" data="' + obj.ConAndCampaignid + '"  class="btn red"><i class="fa fa-leaf" data-toggle="tooltip"  data-placement="bottom" title="Convert To Lead"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr style="padding-right: 25px"><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/Outsider-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Campaign</label></td><td style="width:25%;"><a id="ConvertToLead" onclick="ConvertToLead(this);" data="' + obj.ConAndCampaignid + '"  class="btn red"><i class="fa fa-leaf" data-toggle="tooltip"  data-placement="bottom" title="Convert To Lead"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }
                else if (obj.opportunityFlag == '0') {
                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="ConvertToOpportunity" onclick="ConvertToOpportunity(this);" data="' + obj.Lead_Code + '" class="btn blue"><i class="fa fa-tag" data-toggle="tooltip"  data-placement="bottom" title="Convert To Opportunity"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Lead</label></br><a id="ConvertToOpportunity" onclick="ConvertToOpportunity(this);" data="' + obj.Lead_Code + '" class="btn blue"><i class="fa fa-tag" data-toggle="tooltip"  data-placement="bottom" title="Convert To Opportunity"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/Outsider-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Lead</label></td><td style="width:25%;"><a id="ConvertToOpportunity" onclick="ConvertToOpportunity(this);" data="' + obj.Lead_Code + '" class="btn blue"><i class="fa fa-tag" data-toggle="tooltip"  data-placement="bottom" title="Convert To Opportunity"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }
                else if (obj.AdmissionFlag == '0') {
                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="ConvertToAdmission" onclick="BookAdmission(this);" data="' + obj.Opportunity_Code + '" class="btn purple"><i class="glyphicon glyphicon-lock" data-toggle="tooltip"  data-placement="bottom" title="Book Admission"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Opportunity</label></br><a id="ConvertToAdmission" onclick="BookAdmission(this);" data="' + obj.Opportunity_Code + '" class="btn purple"><i class="glyphicon glyphicon-lock" data-toggle="tooltip"  data-placement="bottom" title="Book Admission"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width:25%;"><b>Name-</b>' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/Outsider-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Opportunity</label></td><td style="width:25%;"><a id="ConvertToAdmission" onclick="BookAdmission(this);" data="' + obj.Opportunity_Code + '" class="btn purple"><i class="glyphicon glyphicon-lock" data-toggle="tooltip"  data-placement="bottom" title="Book Admission"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }
                else {
                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr style="padding-right: 25px"><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Admission</label></br><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr style="padding-right: 25px"><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/Outsider-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Admission</label></td><td style="width:25%;"><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }

                if (obj.PrevButtonFlag == '1') {
                    $("#divPrevButton").css('display', 'block');
                }
                else {
                    $("#divPrevButton").css('display', 'none');
                }

                if (obj.NextButtonFlag == '1') {
                    $("#divnextButton").css('display', 'block');
                }
                else {
                    $("#divnextButton").css('display', 'none');
                }
                document.getElementById('lblShowingInfo').innerHTML = obj.ShowingInfo;
            })
            if (data.d == '') {
                controlVisiblity('CampaignDetail');
                toastr.error('No Record Found!');
                document.getElementById("lblShowingInfo").innerHTML = "";
            }
            else {
                controlVisiblity('CampaignCountSearch');
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
        })
    });
};

function GetCampaignCountDetailsSearchData() {      //To Bind Result Grid On Campaign Count Search click
    waitingDialog.show('Please wait while the data is getting populated', { dialogSize: 'sm', progressType: 'warning' });
    var UID = ReadCookie();
    var PageNo = document.getElementById("lblPageNo").value;
    var lableflag = document.getElementById("lblCamapignflag").value;
    var campaignid = document.getElementById("lblCampaignDetailcode").value;
    var CampstudentName = document.getElementById("txtCampStudentName").value;
    var CampSchoolName = ""; //document.getElementById("txtCampSchoolName").value;
    var CampMTNMT = document.getElementById("ddlMTNMT").value;
    var CampCenter = document.getElementById("ddlCenterSearch").value;
    //var BoardName = document.getElementById("txtBoard").value;
    var ContactNo = document.getElementById("txtContactNumber").value;
    var CampStudentUID = document.getElementById("txtCampStudentUID").value;
    var InstitutionType = document.getElementById("ddlInstitutionType").value;
    var BoardId = document.getElementById("ddlBoard").value;
    var Standard = document.getElementById("ddlClassStandard").value;
    var School = document.getElementById("ddlSchoolName").value;
    var Exam = document.getElementById("ddlExam").value;
    var ExamStatus = document.getElementById("ddlExamStatus").value;
    var ExamRankFrom = document.getElementById("txtFromRank").value;
    var ExamRankTo = document.getElementById("txtToRank").value;
    var EventId = document.getElementById("ddlEvent").value;
    var Attendance = document.getElementById("ddlAttendance").value;
    var Event_FeedbackHeader_Id = document.getElementById("ddlFeedbackHeader").value;
    var Event_Feedback_Value_Id = document.getElementById("ddlFeedbackValues").value;
    var Followupstatus_id = document.getElementById("ddlstatuslead").value;

    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/GET_CONTACT_COUNT_DETAILS_BY_CAMPAIGN_ID",
        contentType: "application/json; charset=utf-8",
        data: '{"Flag":"' + parseInt(lableflag) + '","CampaignId":"' + campaignid + '","UID":"' + UID + '","StudentName":"' + CampstudentName + '","InstitutionType":"' + InstitutionType + '","CategoryType": "' + CampMTNMT + '","Centername":"' + CampCenter + '","PageNo":"' + parseInt(PageNo) + '","ContactNo":"' + ContactNo + '","Standard_Id":"' + Standard + '","School_Id":"' + School + '","Exam_Id":"' + Exam + '","Exam_Status_Id":"' + ExamStatus + '","Exam_From_Rank":"' + ExamRankFrom + '","Exam_To_Rank":"' + ExamRankTo + '","EventId":"' + EventId + '","Attendance":"' + Attendance + '","Event_FeedbackHeader_Id":"' + Event_FeedbackHeader_Id + '","Event_Feedback_Value_Id":"' + Event_Feedback_Value_Id + '","CampStudentUID":"' + CampStudentUID + '","Board_Id":"' + BoardId + '","Followupstatus":"' + Followupstatus_id + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TCampaign').html('');
            $(data.d).each(function (index, obj) {
                if (obj.LeadFlag == '0') {
                    $('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="ConvertToLead" onclick="ConvertToLead(this);" data="' + obj.ConAndCampaignid + '"  class="btn red"><i class="fa fa-leaf" data-toggle="tooltip"  data-placement="bottom" title="Convert To Lead"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Campaign</label></br><a id="ConvertToLead" onclick="ConvertToLead(this);" data="' + obj.ConAndCampaignid + '"  class="btn red"><i class="fa fa-leaf" data-toggle="tooltip"  data-placement="bottom" title="Convert To Lead"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '</br><b>MT/NMT-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Campaign</label></td><td style="width:25%;"><a id="ConvertToLead" onclick="ConvertToLead(this);" data="' + obj.ConAndCampaignid + '"  class="btn red"><i class="fa fa-leaf" data-toggle="tooltip"  data-placement="bottom" title="Convert To Lead"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }
                else if (obj.opportunityFlag == '0') {
                    $('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="ConvertToOpportunity" onclick="ConvertToOpportunity(this);" data="' + obj.Lead_Code + '" class="btn blue"><i class="fa fa-tag" data-toggle="tooltip"  data-placement="bottom" title="Convert To Opportunity"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Lead</label></br><a id="ConvertToOpportunity" onclick="ConvertToOpportunity(this);" data="' + obj.Lead_Code + '" class="btn blue"><i class="fa fa-tag" data-toggle="tooltip"  data-placement="bottom" title="Convert To Opportunity"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '</br><b>MT/NMT-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Lead</label></td><td style="width:25%;"><a id="ConvertToOpportunity" onclick="ConvertToOpportunity(this);" data="' + obj.Lead_Code + '" class="btn blue"><i class="fa fa-tag" data-toggle="tooltip"  data-placement="bottom" title="Convert To Opportunity"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }
                else if (obj.AdmissionFlag == '0') {
                    $('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b> ' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="ConvertToAdmission" onclick="BookAdmission(this);" data="' + obj.Opportunity_Code + '" class="btn purple"><i class="glyphicon glyphicon-lock" data-toggle="tooltip"  data-placement="bottom" title="Book Admission"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b> ' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Opportunity</label></br><a id="ConvertToAdmission" onclick="BookAdmission(this);" data="' + obj.Opportunity_Code + '" class="btn purple"><i class="glyphicon glyphicon-lock" data-toggle="tooltip"  data-placement="bottom" title="Book Admission"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '</br><b>MT/NMT-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Opportunity</label></td><td style="width:25%;"><a id="ConvertToAdmission" onclick="BookAdmission(this);" data="' + obj.Opportunity_Code + '" class="btn purple"><i class="glyphicon glyphicon-lock" data-toggle="tooltip"  data-placement="bottom" title="Book Admission"></i></a><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }
                else {
                    $('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //$('#TCampaign').append('<tr><td style="width: 100%"><b>Name- ' + obj.Student_Name + '</b></br><b>School Name- </b>' + obj.inst_desc + '</br><b>Enrollment No./UID- </b>' + obj.Con_Id + '</br><b>Mobile No.- </b>' + obj.Handphone1 + '<a href="tel:' + obj.Handphone1 + '"><img src="Images/MobileCall.png" width="25px" /></a></br><b>Inhouse/ Outsider- </b>' + obj.CategoryType + '</br><b>Center Name- </b>' + obj.Centername + '</br><b>Board Name- </b>' + obj.BoardName + '</br><b>Last followup Date- </b>' + obj.LastFollowDate + '</br><b>Last Remark- </b>' + obj.LastRemark + '</br><b>Current Status- </b><label id="lblCurrentStatus" style="color: Red;">Admission</label></br><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a><a id="ViewMoreContactDetails" onclick="ViewMoreContactDetail(this);" data="' + obj.ConAndCampaignid + '" class="btn blue"><i class="fa fa-eye" data-toggle="tooltip" data-placement="bottom" title="View More Detail"></i></a></td></tr>');
                    //                    $('#TCampaign').append('<tr><td style="width:25%;">' + obj.Student_Name + '</td><td style="width:50%;"><b>School Name-</b> ' + obj.inst_desc + '</br><b>Enrollment No./UID-</b> ' + obj.Con_Id + '</br><b>Mobile No.-</b>' + obj.Handphone1 + '</br><b>MT/NMT-</b>' + obj.CategoryType + '</br><b>Center Name-</b>' + obj.Centername + '</br><b>Board Name-</b>' + obj.BoardName + '</br><b>Last followup Date-</b>' + obj.LastFollowDate + '</br><b>Last Remark-</b>' + obj.LastRemark + '</br><b>Current Status-</b><label id="lblCurrentStatus" style="color: Red;">Admission</label></td><td style="width:25%;"><a id="FollowUp" onclick="FollowUp(this);" data="' + obj.Record_Code + '" class="btn yellow"><i class="fa fa-comments-o" data-toggle="tooltip"  data-placement="bottom" title="Follow Up"></i></a></td></tr>');
                }

                document.getElementById('lblShowingInfo').innerHTML = obj.ShowingInfo;

                if (obj.PrevButtonFlag == '1') {
                    $("#divPrevButton").css('display', 'block');
                }
                else {
                    $("#divPrevButton").css('display', 'none');
                }

                if (obj.NextButtonFlag == '1') {
                    $("#divnextButton").css('display', 'block');
                }
                else {
                    $("#divnextButton").css('display', 'none');
                }

            })
            if (data.d == '') {
                controlVisiblity('CampaignCountSearch');
                toastr.error('No Record Found!');
                document.getElementById("lblShowingInfo").innerHTML = "";
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};
//Coding For Campaign Page End

//Coding For convert To Lead Div Start
function AcadYearFill() {   //To Bind Acad Year in Convert To Lead div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindAcadYear",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlAcadYear").append($("<option></option>").val(item.AcadYearId).html(item.AcadYearDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function CenterFill_Search(Campaign_Id) {    //To Bind Center in Last Admission for student
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindoldAdmissionCenter",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"CampaignId":"' + Campaign_Id + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlCenterSearch").append($("<option></option>").val(item.Center_code).html(item.Center_name));
            })
            $('#ddlCenterSearch').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}


//Bind Institution Type
function InstitutionType() {   //To Bind Institution Type
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindInstitutionType",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlInstitutionType").append($("<option></option>").val(item.InstitutionTypeId).html(item.InstitutionTypeDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

//Bind Board
function Board() {   //To Bind Board
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindBoard",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlBoard").append($("<option></option>").val(item.BoardId).html(item.BoardDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}


//Bind School/College
function SchoolCollege(CampaignId) {   //To Bind School/College
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindSchoolCollege",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"CampaignId":"' + CampaignId + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlSchoolName").append($("<option></option>").val(item.School_ID).html(item.School_Name));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

//Bind Campaign Events
function CampaignEvents(CampaignId) {   //To Bind Campaign Events
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindCampaignEvents",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"CampaignId":"' + CampaignId + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlEvent").append($("<option></option>").val(item.Event_ID).html(item.Event_Name));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}


//Bind Exam Name
function FillExamName() {   //To Bind ExamName
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindExamName",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlExam").append($("<option></option>").val(item.Exam_ID).html(item.Exam_Description));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function DivisionFill() {    //To Bind Division in Convert To Lead div
    var UID = ReadCookie();
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindDivision",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"UserId":"' + UID + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlDivision").append($("<option></option>").val(item.Source_Division_Code).html(item.Source_Division_ShortDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function StandardFill(Institution_Type) {    //To Bind Center in Convert To Lead div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindStandard",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"InstitutionType":"' + Institution_Type + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlClassStandard").append($("<option></option>").val(item.Standard_code).html(item.Standard_name));
            })
            $('#ddlClassStandard').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function ExamStatusFill(ExamId) {    //To Bind Exam Status
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindExamStatus",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"ExamId":"' + ExamId + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlExamStatus").append($("<option></option>").val(item.Exam_Status_Id).html(item.Exam_Status_Description));
            })
            $('#ddlExamStatus').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function CenterFill(Division) {    //To Bind Center in Convert To Lead div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindCenter",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"Division":"' + Division + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlCenter").append($("<option></option>").val(item.center_code).html(item.center_name));
            })
            $('#ddlCenter').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}



function SaveConvertContactToLeadData(AcadYear, Division, Center) {    //To save Data In Convert To Lead Div   
    var earray = document.getElementById("lblPKey").value;
    var carreay = earray.split('%');
    var conid = carreay[0];
    var campaignid = carreay[1];
    var errormsg = "";
    var UID = ReadCookie();
    var v = "0";

    if (AcadYear == "0") {
        document.getElementById('lblAcadYear').innerHTML = "Select Acad Year";
        $('[data-id="ddlAcadYear"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblAcadYear').innerHTML = "";
        $('[data-id="ddlAcadYear"]').addClass('sucessClass');
    }

    if (Division == "0") {
        document.getElementById('lblDivision').innerHTML = "Select Division";
        $('[data-id="ddlDivision"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblDivision').innerHTML = "";
        $('[data-id="ddlDivision"]').addClass('sucessClass');
    }

    if (Center == "0") {
        document.getElementById('lblCenter').innerHTML = "Select Center";
        $('[data-id="ddlCenter"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblCenter').innerHTML = "";
        $('[data-id="ddlCenter"]').addClass('sucessClass');
    }
    if (v == "1") {
        return false;
    }

    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/LeadSaveDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"Lead_campgn_id":"' + campaignid + '","Lead_Con_id":"' + conid + '", "Contact_Assignto":"' + UID + '", "Createdby":"' + UID + '", "Division":"' + Division + '", "Center":"' + Center + '", "AcadYear":"' + AcadYear + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                // LeadId = obj.LeadId;
                if (obj.result == "1") {

                    document.getElementById("lblCampaign_Contact_Code").value = conid + '%' + campaignid;
                    document.getElementById('lblLead_Code').value = obj.LeadId;
                    document.getElementById('lblOpportunity_Code').value = 'Blank';
                    document.getElementById('lblAccount_Id').value = 'Blank';
                    //if Opportunity is not created then Opportunity creation Confirmation                    
                    document.getElementById('lblConvertHeader').innerHTML = 'Convert To Opportunity';
                    document.getElementById('lblConvertDetail').innerHTML = 'Do you want to convert to Opportunity?';
                    controlVisiblity('ConvertToLeadOppAdmission');
                    sweetAlert('Lead Saved Sucessfully', '', 'success');

                    //                    var CId = document.getElementById("lblCampaignDetailcode").value;
                    //                    ViewCampaignCountData(CId);
                    //                    GetCampaignCountDetailsData();
                    //                    controlVisiblity('CampaignCountSearch');
                }
                else {
                    toastr.error('Duplicate Lead');
                }
            });
            if (data.d == '') {
                toastr.error('Lead Not Saved');
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};
//Coding For convert To Lead Div End

//Coding For convert To Opportunity Div Start
function CampaignAcadYearFill() {  //To Bind Acad Year in Convert To Opportunity div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindAcadYear",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlOpportunityAcadYear").append($("<option></option>").val(item.AcadYearId).html(item.AcadYearDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function CampaignDivisionFill() {    //To Bind Division in Convert To Opportunity div
    var UID = ReadCookie();
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindDivision",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"UserId":"' + UID + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlOpportunityDivision").append($("<option></option>").val(item.Source_Division_Code).html(item.Source_Division_ShortDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function CampaignCenterFill(CampaignDivision) {     //To Bind Center in Convert To Opportunity div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindCenter",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"Division":"' + CampaignDivision + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlOpportunityCenter").append($("<option></option>").val(item.center_code).html(item.center_name));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function SalesStageFill() {      //To Bind Sales Stage in Convert To Opportunity div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindSalesStage",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        //async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlSalesStage").append($("<option></option>").val(item.Sales_Id).html(item.Sales_Stage_Desc));
            })
            $('#ddlSalesStage').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function ProductFill(Center, AcadYear) {    //To Bind Product in Convert To Opportunity div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindProduct",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"Center":"' + Center + '","AcadYear":"' + AcadYear + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlProduct").append($("<option></option>").val(item.stream_code).html(item.stream_sdesc));
            })
            $('#ddlProduct').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function GetLeadDetailIntoCampaign(LeadCode) {  //To Get Dropdown Values From Lead Div Into opportunity Div
    $("#ddlSalesStage").val(0).change();
    $("#ddlProduct").val(0).change();
    document.getElementById('txtClosuredate1').value = "";
    document.getElementById('lblsalesStage').innerHTML = "";
    document.getElementById('lblProduct').innerHTML = "";
    document.getElementById('lblClosuredate').innerHTML = "";
    document.getElementById('lblProbability').innerHTML = "";
    $('[data-id="ddlSalesStage"]').removeClass('errorClass');
    $('[data-id="ddlProduct"]').removeClass('errorClass');
    $("#txtClosuredate1").removeClass('errorClass');
    $("#txtProbability").removeClass('errorClass');
    $('[data-id="ddlSalesStage"]').removeClass('sucessClass');
    $('[data-id="ddlProduct"]').removeClass('sucessClass');
    $("#txtClosuredate1").removeClass('sucessClass');
    $("#txtProbability").removeClass('sucessClass');
    $("#ddlOpportunityAcadYear").find("option").remove();
    CampaignAcadYearFill();
    $("#ddlOpportunityDivision").find("option").remove();
    CampaignDivisionFill();
    $("#ddlOpportunityCenter").find("option").remove();
    SalesStageFill();
    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/AcadyearDivisionCenterDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"Lead_Id":"' + LeadCode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                document.getElementById('lblopportunityStudentName').innerHTML = obj.StudentName;
                document.getElementById('lblopportunityEmail').innerHTML = obj.Emailid;
                document.getElementById('lblopportunityGender').innerHTML = obj.Gender;
                document.getElementById('lblopportunityMobileNo').innerHTML = obj.Handphone1;
                document.getElementById('lblopportunityCampaign').innerHTML = obj.Campaign_Name;

                $("#ddlOpportunityAcadYear").val(obj.Expected_Join_AcadYear).change();
                $('#ddlOpportunityAcadYear').attr("disabled", "disabled");
                $("#ddlOpportunityDivision").val(obj.Contact_Target_Division).change();
                $('#ddlOpportunityDivision').attr("disabled", "disabled");
                CampaignCenterFill(obj.Contact_Target_Division);
                $("#ddlOpportunityCenter").val(obj.Contact_Target_Center).change();
                $('#ddlOpportunityCenter').attr("disabled", "disabled");

                ProductFill(obj.Contact_Target_Center, obj.Expected_Join_AcadYear);
            })
            waitingDialog.hide();
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};

function SaveConvertLeadToOpportunityData(AcadYear, Division, Center, SalesStage, Product, ClosureDate, Probability) {    //To save Data In Convert To Opportunity Div
    var leadcode = document.getElementById("lblPKey1").value;
    var errormsg = "";
    var ProductName = $("#ddlProduct option:selected").text();
    var UID = ReadCookie();
    var v = "0";

    if (SalesStage == "0") {
        document.getElementById('lblsalesStage').innerHTML = "Select Sales Stage";
        $('[data-id="ddlSalesStage"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblsalesStage').innerHTML = "";
        $('[data-id="ddlSalesStage"]').addClass('sucessClass');
    }

    if (Product == "0") {
        document.getElementById('lblProduct').innerHTML = "Select Product";
        $('[data-id="ddlProduct"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblProduct').innerHTML = "";
        $('[data-id="ddlProduct"]').addClass('sucessClass');
    }

    if (ClosureDate == "") {
        document.getElementById('lblClosuredate').innerHTML = "Enter Closure Date";
        $("#txtClosuredate").addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblClosuredate').innerHTML = "";
        $("#txtClosuredate").addClass('sucessClass');
    }

    if (Probability == "") {
        document.getElementById('lblProbability').innerHTML = "Enter Probability";
        $("#txtProbability").addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblProbability').innerHTML = "";
        $("#txtProbability").addClass('sucessClass');
    }

    if (v == "1") {
        return false;
    }

    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/CampaignSaveDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"Lead_id":"' + leadcode + '","Sales_Stage":"' + SalesStage + '","Opp_Expected_Close_Date":"' + ClosureDate + '", "Opp_Probability_Percent":"' + Probability + '", "Opp_Contact_Division":"' + Division + '", "Opp_Contact_Center":"' + Center + '", "Opp_Contact_AssignTo":"' + UID + '", "Created_By":"' + UID + '", "Oppor_Product":"' + ProductName + '", "Oppor_Product_Id":"' + Product + '", "acad_year":"' + AcadYear + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                if (obj.Oppur_Id == "-1") {
                    toastr.error('Opportunity Already Created');
                }
                else {
                    document.getElementById("lblCampaign_Contact_Code").value = leadcode;
                    document.getElementById('lblLead_Code').value = leadcode;
                    document.getElementById('lblOpportunity_Code').value = obj.Oppur_Id;
                    document.getElementById('lblAccount_Id').value = 'Blank';
                    //if Admission is not created then Admission creation Confirmation                    
                    document.getElementById('lblConvertHeader').innerHTML = 'Book Admission';
                    document.getElementById('lblConvertDetail').innerHTML = 'Do you want to Book Admission?';
                    controlVisiblity('ConvertToLeadOppAdmission');
                    //                    var CId = document.getElementById("lblCampaignDetailcode").value;
                    //                    ViewCampaignCountData(CId);
                    //                    GetCampaignCountDetailsData();
                    //                    controlVisiblity('CampaignCountSearch');
                    sweetAlert('Opportunity Saved Sucessfully', '', 'success');
                }
            });
            if (data.d == '') {
                toastr.error('Opportunity Not Saved');
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};
//Coding For convert To Opportunity Div End

//Coding For book Admission Div Start
function BookAdmissionAcadYearFill() {   //To Bind Acad Year in book Admission div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindAcadYear",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlBookAdmissionAcadYear").append($("<option></option>").val(item.AcadYearId).html(item.AcadYearDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function BookAdmissionDivisionFill() {   //To Bind Division in Book Admission div
    var UID = ReadCookie();
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindDivision",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"UserId":"' + UID + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlBookAdmissionDivision").append($("<option></option>").val(item.Source_Division_Code).html(item.Source_Division_ShortDesc));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function BookAdmissionCenterFill(BookAdmissionDivision) {     //To Bind Center in Book Admission div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindCenter",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"Division":"' + BookAdmissionDivision + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlBookAdmissionCenter").append($("<option></option>").val(item.center_code).html(item.center_name));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function BookAdmissionSalesStageFill() {    //To Bind Sales Stage in Book Admission div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindSalesStage",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlBookAdmissionSalesStage").append($("<option></option>").val(item.Sales_Id).html(item.Sales_Stage_Desc));
            })
            $('#ddlBookAdmissionSalesStage').selectpicker('refresh');
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function PayPlanFill() {   //To Bind Pay Plan in Book Admission div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindPayPlan",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlPayPlan").append($("<option></option>").val(item.Pay_Plan_Code).html(item.Pay_Plan_Description));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function SubjectData(Center, Product) {     //To Bind Subjects Based On Product and Center In Book Admission div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindOptionalSubject",
        contentType: "application/json; charset=utf-8",
        data: '{"Product":"' + Product + '","Center": "' + Center + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TSubjectbody').html('');
            $(data.d).each(function (index, obj) {
                $('#TSubjectbody').append('<tr><td style="width:20%;"><input type="checkbox" onclick="SubjectClick()" name="chk[]" id="chkStudent" value="' + obj.SGR_DESC + '" ></td><td id="tdlblsubjectname"><input type="label" id="lblSubjectName" style="width:80%;" value="' + obj.SGR_DESC + '" ></td><td id="tdSubCode" style="display:none"><input type="label" name="lblSubjectCode" id="lblSubjectCodeID" value="' + obj.sgr_material + '" ><input type="label" name="lblVoucherType" id="lblVoucherTypeId" value="' + obj.voucher_typ + '" ><input type="label" name="lblVoucherAmount" id="lblVoucherAmountID" value="' + obj.voucher_amount + '" ><input type="label" name="lbluom" id="lbluomID" value="' + obj.uom + '" ><input type="label" name="lbluomdesc" id="lbluomdescId" value="' + obj.uom_base_name + '" ></td></tr>');
                count = obj.rowcount;
                SGR_DESC = obj.SGR_DESC;
                sgr_material = obj.sgr_material;
                voucher_amount = obj.voucher_amount;
                sgr_sel_group = obj.sgr_sel_group;
                voucher_typ = obj.voucher_typ;
                uom = obj.uom;
                uom_base_name = obj.uom_base_name;
                uom_value = obj.uom_value;
                voucher_mode = obj.voucher_mode;
            })
        }),
        error: (function () {
        })
    });
};

function FeeStructureData() {  //To Bind Fee Structures In Book Admission div
    var Opportunitycode = document.getElementById("lblOpportunityCode").value;
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindFeeStructure",
        contentType: "application/json; charset=utf-8",
        data: '{"Oppurid":"' + Opportunitycode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TFeeStructurebody').html('');
            $(data.d).each(function (index, obj) {
                $('#TFeeStructurebody').append('<tr><td style="padding-top:35px;">' + obj.Voucher_Description + '</td><td style="padding-top:35px;">' + obj.Final_Voucher_Amount + '</td></tr>');
                ConId = obj.Con_Id;
                Campaign = obj.campaign;
                count = obj.rowcount;
            })
        }),
        error: (function () {
        })
    });
};

function EnrollmentDeatils() {    //To save Data In StudentInfo (Enrollment)
    var UID = ReadCookie();
    var studentId = "";
    var Opportunitycode = document.getElementById("lblOpportunityCode").value;
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/Enrollment",
        contentType: "application/json; charset=utf-8",
        data: '{"Userid":"' + UID + '","Opp_Id":"' + Opportunitycode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                studentId = obj.StudentId;
                return studentId;
            });
            if (data.d == '') {
                return studentId;
            }
        }),
        error: (function () {
        })
    });
};

function DeletePricingprocedurevalue() {    // (DeleteOldFeeStructure)
    var result = "";
    var Opportunitycode = document.getElementById("lblOpportunityCode").value;
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/DeletePricingprocedurevaluebyopp",
        contentType: "application/json; charset=utf-8",
        data: '{"Opp_Id":"' + Opportunitycode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                result = obj.Result;
                return result;
            });
            if (data.d == '') {
                return result;

            }
        }),
        error: (function () {
        })
    });
};

function InserttoGetPricingprocedurevalueByOppoId(Materialcode, Voucher_type, Voucher_Amt, Uomid, Uomname, Quantity, Amount, Remarks) {    // (DeleteOldFeeStructure)
    var result = "";
    var Opportunitycode = document.getElementById("lblOpportunityCode").value;
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/InserttoGetPricingprocedurevalue",
        contentType: "application/json; charset=utf-8",
        data: '{"Oppid":"' + Opportunitycode + '","Materialcode":"' + Materialcode + '","Voucher_type":"' + Voucher_type + '","Voucher_Amt":"' + Voucher_Amt + '","Uomid":"' + Uomid + '","Uomname":"' + Uomname + '","Unit":"' + Uomid + '","Quantity":"' + Quantity + '","Amount":"' + Amount + '","Remarks":"' + Remarks + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                result = obj.Result;
                return result;
            });
            if (data.d == '') {
                return result;
            }
        }),
        error: (function () {
        })
    });
};

function GetPricingprocedureValue(Materialcode) {    // (DeleteOldFeeStructure)
    var result = "";
    var Opportunitycode = document.getElementById("lblOpportunityCode").value;
    var PayPlan = document.getElementById("ddlPayPlan").value;
    var flag2 = "2";
    if (PayPlan == "EMI") {
        flag2 = "3";
    }
    else {
        flag2 = "2";
    }
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/GetPricingprocedureValue_New",
        contentType: "application/json; charset=utf-8",
        data: '{"Oppid":"' + Opportunitycode + '","Materialcode":"' + Materialcode + '","flag":"' + flag2 + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                result = obj.Result;
                return result;
            });
            if (data.d == '') {
                return result;
            }
        }),
        error: (function () {
        })
    });
};

function GetOpportunityDetailIntoCampaign(OpportunityCode) {  //To Get Dropdown Values From Opportunity Div Into BookAdmission Div
    $("#ddlPayPlan").val(0).change();
    document.getElementById('lblPayplan').innerHTML = "";
    document.getElementById('lblSubject').innerHTML = "";
    $("#ddlBookAdmissionAcadYear").find("option").remove();
    BookAdmissionAcadYearFill();
    $("#ddlBookAdmissionDivision").find("option").remove();
    BookAdmissionDivisionFill();
    $("#ddlBookAdmissionSalesStage").find("option").remove();
    $("#ddlBookAdmissionCenter").find("option").remove();
    $('[data-id="ddlPayPlan"]').removeClass('errorClass');
    $('[data-id="ddlPayPlan"]').removeClass('sucessClass');
    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/GetOpportunityDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"Opportunity_Id":"' + OpportunityCode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                document.getElementById('lblAdmissionStudentName').innerHTML = obj.StudentName;
                document.getElementById('lblAdmissionEmailId').innerHTML = obj.Emailid;
                document.getElementById('lblAdmissionGender').innerHTML = obj.Gender;
                document.getElementById('lblAdmissionMobileNo').innerHTML = obj.Handphone1;
                document.getElementById('lblAdmissionCampaign').innerHTML = obj.Campaign_Name;

                $("#ddlBookAdmissionAcadYear").val(obj.Acad_Year).change();
                $('#ddlBookAdmissionAcadYear').attr("disabled", "disabled");

                $("#ddlBookAdmissionDivision").val(obj.Opp_Contact_Division).change();
                $('#ddlBookAdmissionDivision').attr("disabled", "disabled");
                BookAdmissionCenterFill(obj.Opp_Contact_Division);

                $("#ddlBookAdmissionCenter").val(obj.Opp_Contact_Center).change();
                $('#ddlBookAdmissionCenter').attr("disabled", "disabled");

                BookAdmissionSalesStageFill();

                $("#ddlBookAdmissionSalesStage").val(obj.SalesStage_Id);
                $('#ddlBookAdmissionSalesStage').attr("disabled", "disabled");

                $("#txtBookAdmissionClosureDate1").val(obj.Opp_Expected_Close_Date);
                document.getElementById("txtBookAdmissionClosureDate1").disabled = true;

                document.getElementById('lblBookAdmissionProbability').innerHTML = obj.Opp_Probability_Percent;
                document.getElementById('lblBookAdmissionProduct').innerHTML = obj.Oppor_Product;

                SubjectData(obj.Opp_Contact_Center, obj.Oppor_Product_Id);

            })
            waitingDialog.hide();
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};

function BtnProceedClick() {    // Get data on proceed button click
    controlVisiblity('BookAdmission');
    $("#divbookAdmissionProceedButton").css('display', 'inline');

    var PayPlan = document.getElementById("ddlPayPlan").value;
    var v = "0";

    if (PayPlan == "0") {
        document.getElementById('lblPayplan').innerHTML = "Select Pay Plan";
        $('[data-id="ddlPayPlan"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblPayplan').innerHTML = "";
        $('[data-id="ddlPayPlan"]').addClass('sucessClass');
    }

    var chks = document.getElementsByName('chk[]');
    var SelectedSubject = "";
    var hasChecked = false;
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            hasChecked = true;
            SelectedSubject = SelectedSubject + '<tr><td>' + chks[i].value + '</td><tr/>';
        }
    }
    if (hasChecked == false) {
        document.getElementById('lblSubject').innerHTML = "You must select at least one Subject";
        v = "1";
    }
    else {
        document.getElementById('lblSubject').innerHTML = "";
    }

    if (v == "1") {
        return false;
    }
    if (hasChecked == true && PayPlan != "0") {
        $("#divbookAdmissionProceedButton").css('display', 'none');
    }
    $("#btnbookAdmissionClose").css('display', 'inline-block');
    $("#trFeeStructure").css('display', 'table-row');
    $("#trProduct").css('display', 'table-row');
    $("#divbtnSubmit").css('display', 'inline-block');
    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    var StudentId = EnrollmentDeatils();
    var result = DeletePricingprocedurevalue();
    var SBCode = document.getElementsByName('lblSubjectCode');
    var Voucher_type = document.getElementsByName('lblVoucherType');
    var Voucher_Amt = document.getElementsByName('lblVoucherAmount');
    var Uomid = document.getElementsByName('lbluom');
    var Uomname12 = document.getElementsByName('lbluomdesc');
    var MaterialCode = "";
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            var result1 = InserttoGetPricingprocedurevalueByOppoId(SBCode[i].value, Voucher_type[i].value, Voucher_Amt[i].value, Uomid[i].value, Uomname12[i].value, "1", Voucher_Amt[i].value, "");
            MaterialCode = MaterialCode + SBCode[i].value + ",";
        }
    }
    GetPricingprocedureValue(MaterialCode);
    FeeStructureData();

    $('#TConfirmedSubjectbody').html('');
    $('#TConfirmedSubjectbody').append(SelectedSubject);
    waitingDialog.hide();
}

function SaveStudentadmissiondata() {    // to save data in Book Admission div
    var result = "";
    var Opportunitycode = document.getElementById("lblOpportunityCode").value;
    var PayPlan = document.getElementById("ddlPayPlan").value;
    var UID = ReadCookie();
    var flag2 = "2";
    if (PayPlan == "EMI") {
        flag2 = "3";
    }
    else {
        flag2 = "2";
    }
    var chks = document.getElementsByName('chk[]');
    var SBCode = document.getElementsByName('lblSubjectCode');
    var MaterialCode = "";
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            MaterialCode = MaterialCode + SBCode[i].value + ",";
        }
    }
    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/CreateAccount",
        contentType: "application/json; charset=utf-8",
        data: '{"Oppid":"' + Opportunitycode + '","MaterialCode":"' + MaterialCode + '","Paytype":"' + PayPlan + '","Userid":"' + UID + '","flag2":"' + flag2 + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                result = obj.Accountid;
            });
            if (data.d == '') {
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });

    if (result == "0") {
        toastr.error('Admission Already Done');
        $("#btnConfirmedAdmissionClose").css('display', 'none');
    }
    else if (result == "") {
        toastr.error('Admission Not Saved');
    }
    else {
        var CId = document.getElementById("lblCampaignDetailcode").value;
        ViewCampaignCountData(CId);
        //EnterContactData();
        GetCampaignCountDetailsData();
        controlVisiblity('CampaignCountSearch');
        sweetAlert('Admission Done Sucessfully', '', 'success');
        $("#btnConfirmedAdmissionClose").css('display', 'none');
        $("#divAddmissionConfirmed").css('display', 'none');
    }
};

//Coding For book Admission Div End

//Coding For Followup Div start
function InteractedRelFill() {   //To Bind Interacted Rel in Followup div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindInteractedRel",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlInteractedRel").append($("<option></option>").val(item.InteractedWithId).html(item.InteractedWithDescription));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function FollowupStatusFill() {   //To Bind FollowupStatus in Followup div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindCampusFollowUp",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlFollowupStatus").append($("<option></option>").val(item.FollowUpId).html(item.FollowUpDescription));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function Lost_Followup_Reasons() {   //To Bind Lost Followup Reason in Followup div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindCampaign_LostFollowupResons",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlLostFollowupReason").append($("<option></option>").val(item.Id).html(item.Description));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}

function Followup_Remark_Conclusion() {   //To Bind Followup Remark Conclusion in Followup div
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindCampaign_Followup_Remark_Conclusion",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlRemarkConclusion").append($("<option></option>").val(item.Id).html(item.Description));
            })
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}


function ViewStudentDetail(Recordcode) {   //followup click in grid
    controlVisiblity('FollowUp');
    var Leadflag = document.getElementById('lblLeadflag').value;
    var Opportunityflag = document.getElementById('lblOpportunityflag').value;
    var Admissionflag = document.getElementById('lblAdmissionflag').value;
    // var followup = document.getElementById('lblCurrentStatus').innerHTML;
    //    if (Leadflag == "1" && Opportunityflag == "1" && Admissionflag == "1" ) {
    //    toastr.success('This Contact Has Taken Admission'); 
    //    }
    $("#ddlInteractedRel").val(0).change();
    $("#ddlFollowupStatus").val(0).change();
    $("#ddlLostFollowupReason").val(0).change();
    $("#ddlRemarkConclusion").val(0).change();
    document.getElementById("txtInteractedWith").value = "";
    document.getElementById("txtFollowupDate1").value = "";
    document.getElementById('lblInteractedrel').innerHTML = "";
    document.getElementById('lblFollowupstatus').innerHTML = "";
    document.getElementById('lblLostFollowupReason').innerHTML = "";
    document.getElementById('lblRemarkConclusion').innerHTML = "";
    document.getElementById('lblFeedback').innerHTML = "";
    document.getElementById('lblNextFollowupdate').innerHTML = "";
    $('[data-id="ddlInteractedRel"]').removeClass('errorClass');
    $('[data-id="ddlFollowupStatus"]').removeClass('errorClass');
    $('[data-id="ddlLostFollowupReason"]').removeClass('errorClass');
    $('[data-id="ddlRemarkConclusion"]').removeClass('errorClass');
    $("#txtFeedBack").removeClass('errorClass');
    $("#txtFollowupDate").removeClass('errorClass');
    $('[data-id="ddlInteractedRel"]').removeClass('sucessClass');
    $('[data-id="ddlFollowupStatus"]').removeClass('sucessClass');
    $('[data-id="ddlLostFollowupReason"]').removeClass('sucessClass');
    $('[data-id="ddlRemarkConclusion"]').removeClass('sucessClass');
    $("#txtFeedBack").removeClass('sucessClass');
    $("#txtFollowupDate").removeClass('sucessClass');
    $("#trLostFollowupReason").css('display', 'none');

    var HandlededBy = ReadCookieName();
    document.getElementById('lblHandledBy').innerHTML = HandlededBy;
    document.getElementById("txtFeedBack").value = "";
    document.getElementById("txtFollowupDate1").value = "";
    waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/ViewStudentDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"RecordId":"' + Recordcode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                if (obj.LeadFlag != '0' && obj.opportunityFlag != '0' && obj.AdmissionFlag != '0') {
                    toastr.success('This Contact Has Taken Admission');
                }

                document.getElementById('lblLeadflag').innerHTML = obj.LeadFlag;
                document.getElementById('lblOpportunityflag').innerHTML = obj.opportunityFlag;
                document.getElementById('lblAdmissionflag').innerHTML = obj.AdmissionFlag;
                document.getElementById('lblFollowupStudentName').innerHTML = obj.StudentName;
                document.getElementById('lblFollowupEmail').innerHTML = obj.Emailid;
                document.getElementById('lblFollowupGender').innerHTML = obj.Gender;
                document.getElementById('lblFollowupMobileNo').innerHTML = obj.Handphone1;
                document.getElementById('lblFollowupCampaign').innerHTML = obj.Campaign;

                ViewStudent_CampaignFollowup(Recordcode);
                ViewStudent_CampaignEventFollowup(Recordcode);
            })

            if (data.d == '') {
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            waitingDialog.hide();
        })
    });
};






//Coding For Followup Div End

function hideTD(id) {
    var td = document.getElementById(id);
    td.style.display = 'none';
}

//Cookie Functions Start

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split('&');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function ReadCookie() {
    var cookieValue = getCook('CRMCookiesLoginInfo');
    var allcookies = cookieValue;
    var ID = '';

    //Get all the cookies pairs in an array
    cookiearray = allcookies.split('&');

    // Now take key value pair out of this array
    for (var i = 0; i < cookiearray.length; i++) {
        name = cookiearray[i].split('=')[0];
        value = cookiearray[i].split('=')[1];
        ID = cookiearray[i].split('=')[2];
        if (name == 'UserID') {
            return value;
        }
    }
}

function ReadCookieName() {
    var cookieValue = getCook('CRMCookiesLoginInfo');
    var allcookies = cookieValue;
    var ID = '';
    //Get all the cookies pairs in an array
    cookiearray = allcookies.split('&');
    // Now take key value pair out of this array
    for (var i = 0; i < cookiearray.length; i++) {
        name = cookiearray[i].split('=')[0];
        value = cookiearray[i].split('=')[1];
        ID = cookiearray[i].split('=')[2];
        if (name == 'UserName') {
            return value;
        }
    }
}

function getCook(cookiename) {
    // Get name followed by anything except a semicolon
    var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}

//Cookie Functions End 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CampaignFillmultiple() {    //To Bind Campaigns in Search div
    var UID = ReadCookie();
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/BindCampaign",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"UserId":"' + UID + '"}',
        type: "POST",
        async: false,
        success: function (res) {
            $.each(res.d, function (name, item) {
                $("#ddlcampaignmultiple").append($("<option></option>").val(item.CampaignId).html(item.Campaign_Name));
            })
            $("#ddlcampaignmultiple").select2();
        },
        error: function (response) {
        },
        failure: function (response) {
        }
    });
}


function ViewCampaignCountData(Campid) {   //To view Campaign Count
    var UID = ReadCookie();

    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/CampaignsDetailwm",
        contentType: "application/json; charset=utf-8",
        data: '{"CampaignId":"' + Campid + '","userId":"' + UID + '"}',
        dataType: "json",
        async: true,
        success: (function (data) {
            var table = $("#example").DataTable();
            //table.clear();
            //table.reload();
            if (data.d.length < 1) {
                alert("No data found");
            }
            else {
                // DataTable
                var table = $('#example').DataTable({
                    responsive: true,
                    destroy: true,
                    data: data.d,
                    ordering: true,
                    searching: true,
                    deferRender: true,
                    paging: false,
                    dom: 'Bfrtip',
                    buttons: [
                        'columnsToggle'
                    ],
                    "columns": [
                        { "data": "Campaign_Id", "title": "Campaign Id" },
                        { "data": "Contacts_Id", "title": "Contact ID" },
                        { "data": "CampaignName", "title": "Campaign Name" },
                        { "data": "StudentName", "title": "Student Name" },
                        { "data": "Institution", "title": "Institution" },
                        { "data": "RCO_Score", "title": "RCO Score" },
                        { "data": "LatestFollowupClosureRemark", "title": "Followup Remark" },
                        { "data": "ContactStatus", "title": "Contact Status" },
                        { "data": "Interacted_On", "title": "Interacted On" },
                        { "data": "Username", "title": "Interacted By" },
                        { "data": "Event_Name1", "title": "Event 1" },
                        { "data": "Attendstatus1", "title": "Attendance 1" },
                        { "data": "CampaignEventFeedbackValue1", "title": "Feedback 1" },
                        { "data": "Event_Name2", "title": "Event 2" },
                        { "data": "Attendstatus2", "title": "Attendance 2" },
                        { "data": "CampaignEventFeedbackValue2", "title": "Feedback 2" },
                        { "data": "Event_Name3", "title": "Event 3" },
                        { "data": "Attendstatus3", "title": "Attendance 3" },
                        { "data": "CampaignEventFeedbackValue3", "title": "Feedback 3" },
                        { "data": "Event_Name4", "title": "Event 4" },
                        { "data": "Attendstatus4", "title": "Attendance 4" },
                        { "data": "CampaignEventFeedbackValue4", "title": "Feedback 4" }

                    ],
                    "columnDefs": [
                        { "visible": false, "targets": 0 }
                    ]

                });

                $('#example thead th').each(function () {
                    var title = $('#example thead th').eq($(this).index()).text();
                    $(this).html('<input type="text" placeholder="Search ' + title.trim() + '" />');

                });



                $('#example tbody').on('click', '[id*=btnDetails]', function () {
                    var data = table.row($(this).parents('tr')).data();
                    var customerID = data[0];
                    var name = data[1];
                    var title = data[2];
                    var city = data[3];
                    alert("Customer ID : " + customerID + "\n" + "Name : " + name + "\n" + "Title : " + title + "\n" + "City : " + city);
                });

                /* Apply the search for individual columns*/
                table.columns().every(function () {
                    //e.preventDefault();
                    var that = this;
                    $('input', this.header()).on('keydown', function (ev) {
                        //if (ev.keyCode == 13) { //only on enter keypress (code 13)

                        that
                            .search(this.value)
                            .draw();
                        // }
                    });
                });


                table.columns().eq(0).each(function (colIdx) {
                    $('input, select', table.column(colIdx).header()).on('click', function (e) {
                        e.stopPropagation();
                    });
                });

                controlVisiblity('CampaignDetail');
            }


            if (data.d == '') {
                toastr.error('No Data');
            }
            else {
                toastr.success('Data Populated Successfully');

            }
        }),
        error: (function (req, err) {
            //console.log(req);
            //console.error('console.error');
            toastr.error('Something Gone Wrong....');
        })
    });
};

function GetCallingDetails(concode) {   //To Get Calling Details by Contact ID   
    document.getElementById('txtCallingNumbershandphone1').value = "";
    document.getElementById('txtCallingNumbershandphone2').value = "";
    document.getElementById('txtCallingNumberlandline').value = "";
    document.getElementById('txtcampaignid').value = "";
    document.getElementById('txtcampaignname').value = "";
    document.getElementById('txtconid').value = "";
    document.getElementById('txtuserid').value = "";
    document.getElementById('txtrecordno').value = "";
    var UID = ReadCookie();
    //waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/Getcallingdetails",
        contentType: "application/json; charset=utf-8",
        data: '{"ConId":"' + concode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                document.getElementById('txtCallingNumbershandphone1').value = obj.Shandphone1;
                document.getElementById('txtCallingNumbershandphone2').value = obj.Shandphone2;
                document.getElementById('txtCallingNumberlandline').value = obj.Slandline;
                document.getElementById('txtcampaignid').value = obj.Campaignid;
                document.getElementById('txtcampaignname').value = obj.Campaignname;
                document.getElementById('txtconid').value = concode;
                document.getElementById('txtuserid').value = UID;
                document.getElementById('txtrecordno').value = obj.Record_No;
            })

            if (data.d == '') {
                //waitingDialog.hide();
            }
            else {
                //waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            //waitingDialog.hide();
        })
    });
};

function GetAgentCallingExtension() {   //To Get Agent Extn for Viotekk Calling  
    document.getElementById('txtagentid').value = "";
    document.getElementById('txtagentname').value = "";
    var UID = ReadCookie();
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/GetUserCallingExtension",
        contentType: "application/json; charset=utf-8",
        data: '{"Userid":"' + UID + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                document.getElementById('txtagentid').value = obj.Agentid;
                document.getElementById('txtagentname').value = obj.Username;
                document.getElementById('lblUserName').innerHTML = obj.Username;
            })

            if (data.d == '') {
                //waitingDialog.hide();
                toastr.error('No Records Found');
            }
            else {
                //waitingDialog.hide();
                //toastr.error('No Records Found');
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            //waitingDialog.hide();
        })
    });
};

var callData = "";

function callstartbtn() {
    var callingflag = $('#txtcallingflag').val()
    if (callingflag == 1) {
        document.getElementById("callEndBtn").style.display = "block";
        document.getElementById("callStartBtn").style.display = "none";
        document.getElementById("callhold").style.display = "block";
        document.getElementById("callunhold").style.display = "none";
    }
    else if (callingflag == 2) {
        document.getElementById("callEndBtn1").style.display = "block";
        document.getElementById("callStartBtn1").style.display = "none";
        document.getElementById("callhold1").style.display = "block";
        document.getElementById("callunhold1").style.display = "none";
    }
    else if (callingflag == 3) {
        document.getElementById("callEndBtn2").style.display = "block";
        document.getElementById("callStartBtn2").style.display = "none";
        document.getElementById("callhold2").style.display = "block";
        document.getElementById("callunhold2").style.display = "none";
    }
   

    //    setTimeout(function () {
    //        document.getElementById("callEndBtn").style.display = "block";
    //        document.getElementById("callStartBtn").style.display = "none";
    //        document.getElementById("callhold").style.display = "block";
    //        document.getElementById("callunhold").style.display = "none";
    //    }, 1000);

}
function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



function callStart() {
    //alert('Hi');
    var callingflag = $('#txtcallingflag').val()
    if (callingflag == 1) {
        //alert("1");
        var phoneNumber = document.getElementById("txtCallingNumbershandphone1").value,
            agentId = document.getElementById("txtuserid").value,
            agentName = document.getElementById("txtagentname").value,
            customerid = document.getElementById("txtconid").value,
            campaign_id = document.getElementById("txtcampaignid").value,
            agent_id = document.getElementById("txtagentid").value,
            campaign_name = document.getElementById("txtcampaignname").value

        var Chk = getCookie('typevalue');

        if (Chk == 'M') {
            Android.getCallDetail(phoneNumber, agentId, customerid, campaign_id);
        }

    }
    else if (callingflag == 2) {
        //alert("2");
        var phoneNumber = document.getElementById("txtCallingNumbershandphone2").value,
            agentId = document.getElementById("txtuserid").value,
            agentName = document.getElementById("txtagentname").value,
            customerid = document.getElementById("txtconid").value,
            campaign_id = document.getElementById("txtcampaignid").value,
            agent_id = document.getElementById("txtagentid").value,
            campaign_name = document.getElementById("txtcampaignname").value

        var Chk = getCookie('typevalue');
        if (Chk == 'M') {
            Android.getCallDetail(phoneNumber, agentId, customerid, campaign_id);
        }

    }
    else if (callingflag == 3) {
        //alert("3");
        var phoneNumber = document.getElementById("txtCallingNumberlandline").value,
            agentId = document.getElementById("txtuserid").value,
            agentName = document.getElementById("txtagentname").value,
            customerid = document.getElementById("txtconid").value,
            campaign_id = document.getElementById("txtcampaignid").value,
            agent_id = document.getElementById("txtagentid").value,
            campaign_name = document.getElementById("txtcampaignname").value

        var Chk = getCookie('typevalue');
        if (Chk == 'M') {
            Android.getCallDetail(phoneNumber, agentId, customerid, campaign_id);
        }
    }

    //old code backup:

//        console.log(form_data);
//        var form_data = {
//            agentExtn: agent_id,
//            agentId: agentId,
//            agentName: agentName,
//            customerNumber: phoneNumber,
//            customerId: customerid,
//            leadsetId: 1,
//            leadsetName: "default",
//            campaignId: campaign_id,
//            campaignName: campaign_name,
//            processId: 1,
//            processName: "TestProcess"
//        }
//        console.log(form_data);

//    try {
//        $.post("https://49.248.16.102/voitekk/callingApis/click2CallExtn", form_data, function (message) {
//            console.log(message);
//            try {
//                updateStream();

//            }
//            catch (e) {
//                console.log("Update Stream Not Found");
//            }
//            $("#MainContainer_callstarttime").val(Date.now() / 1000);
//            var callstarttime = new Date();
//            var timestamp = callstarttime.toTimeString();

//            //        $.gritter.add({
//            //            title: 'Call Connected',
//            //            text: 'Call has been successfully Connected to ' + phoneNumber,
//            //            class_name: 'gritter-success'
//            //        });
//            toastr.success('Call has been successfully Connected to ' + phoneNumber);
//            //  var msg = JSON.parse(message);
//            //  console.log(msg);
//            // $("#customerPhone").val(message.Time);
//        });
//    }
//    catch (e) {
////        console.debug(e);
//    }

//            console.log(form_data);
//            var form_data = {
//                agentExtn: agent_id,
//                agentId: agentId,
//                agentName: agentName,
//                customerNumber: phoneNumber,
//                customerId: customerid,
//                leadsetId: 1,
//                leadsetName: "default",
//                campaignId: campaign_id,
//                campaignName: campaign_name,
//                processId: 1,
//                processName: "TestProcess"
//            }
    //            console.log(form_data);
    var Gentkeyid="agent:ankitkumar:5";
    var COntactNumber="9867679197";
    var leadsetId="23";
    var leadsetname="ankitLead";
     var CamapingID="6";
      var CAmpaingname="ankitCamp";
      var processedId="20";
    var processedIdname="ankitPreview";
    var ws_servers = 'http://49.248.16.102/voitekk/callingApis';

        try {
            $.post(ws_servers + "/clickToCall?agentKey=" +Gentkeyid+"&customerNumber="+COntactNumber+"&leadsetId="+leadsetId+"&leadsetName="+leadsetname+"&campaignId="+CamapingID+"&campaignName="+CAmpaingname+"&processId="+processedId+"&processName="+processedIdname {
                console.log(message);
                try {
                    updateStream();

                }
                catch (e) {
                    console.log("Update Stream Not Found");
                }
                $("#MainContainer_callstarttime").val(Date.now() / 1000);
                var callstarttime = new Date();
                var timestamp = callstarttime.toTimeString();

                //        $.gritter.add({
                //            title: 'Call Connected',
                //            text: 'Call has been successfully Connected to ' + phoneNumber,
                //            class_name: 'gritter-success'
                //        });
                toastr.success('Call has been successfully Connected to ' + phoneNumber);
                //  var msg = JSON.parse(message);
                //  console.log(msg);
                // $("#customerPhone").val(message.Time);
            });
        }
        catch (e) {
    //        console.debug(e);
        }

}

function callEnd(callLegInfo) {
    //call.terminate();
    var Chk = getCookie('typevalue');

    console.log(callLegInfo);
    //alert("Call End Function");
    if (Chk == 'M') {
        Android.getCallENDDetail();
    }
 endcall();

    var callingflag = $('#txtcallingflag').val()
    if (callingflag == 1) {
        document.getElementById("callEndBtn").style.display = "none";
        document.getElementById("callStartBtn").style.display = "block";
        document.getElementById("callhold").style.display = "none";
        document.getElementById("callunhold").style.display = "none";
        var phoneNumber = $('#txtCallingNumbershandphone1').val(), callLegInfo = callLegInfo.replace(/;/g, ',');
    }
    else if (callingflag == 2) {
        document.getElementById("callEndBtn1").style.display = "none";
        document.getElementById("callStartBtn1").style.display = "block";
        document.getElementById("callhold1").style.display = "none";
        document.getElementById("callunhold1").style.display = "none";
        var phoneNumber = $('#txtCallingNumbershandphone2').val(), callLegInfo = callLegInfo.replace(/;/g, ',');
    }
    else if (callingflag == 3) {
        document.getElementById("callEndBtn2").style.display = "none";
        document.getElementById("callStartBtn2").style.display = "block";
        document.getElementById("callhold2").style.display = "none";
        document.getElementById("callunhold2").style.display = "none";
        var phoneNumber = $('#txtCallingNumberlandline').val(), callLegInfo = callLegInfo.replace(/;/g, ',');
    }

    var callData = JSON.parse(callLegInfo);

    console.log(callData);
    $("#customerPhone").val(callData.info[0].customerPhone);
    $("#customerId").val(callData.info[1].customerId);
    $("#leadsetId").val(callData.info[2].leadsetId);
    $("#leadsetName").val(callData.info[3].leadsetName);
    $("#campaignId").val(callData.info[4].campaignId);
    $("#campaignName").val(callData.info[5].campaignName);
    $("#processId").val(callData.info[6].processId);
    $("#processName").val(callData.info[7].processName);
    $("#agentId").val(callData.info[8].agentId);
    $("#crUd").val(callData.info[9].crUd);
    $("#rfUd").val("https://49.248.16.102/dumprecords/" + callData.info[10].rfUd + ".mp3");
    $("#legType").val(callData.info[11].legType);
    $("#snUd").val(callData.info[12].snUd);
    $("#otUd").val(callData.info[13].otUd);
    $("#atEn").val(callData.info[14].atEn);
    $("#txSt").val(callData.info[15].txSt);
    $("#moc").val(callData.info[16].moc);
    var callEndtime = new Date();
    var timestampEnd = callEndtime.toTimeString();
    $("#callendtime").val(timestampEnd);



    //$("#MainContainer_callendtime").val(parseInt(Date.now()/1000));
    //$().toastmessage('Call Ended', "Call Ended.....");
    SaveCallLogdetails();
    //    $.gritter.add({
    //        title: 'Call Ended',
    //        text: 'Call Ended to ' + phoneNumber,
    //        class_name: 'gritter-error'
    //    });
    toastr.success('Call Ended to' + phoneNumber);
    if (callingflag == 1) {
        document.getElementById("callEndBtn").style.display = "none";
        document.getElementById("callStartBtn").style.display = "block";
        document.getElementById("callhold").style.display = "none";
        document.getElementById("callunhold").style.display = "none";

    }
    else if (callingflag == 2) {
        document.getElementById("callEndBtn1").style.display = "none";
        document.getElementById("callStartBtn1").style.display = "block";
        document.getElementById("callhold1").style.display = "none";
        document.getElementById("callunhold1").style.display = "none";

    }
    else if (callingflag == 3) {
        document.getElementById("callEndBtn2").style.display = "none";
        document.getElementById("callStartBtn2").style.display = "block";
        document.getElementById("callhold2").style.display = "none";
        document.getElementById("callunhold2").style.display = "none";

    }

}

function userRegistered() {
    //    $.gritter.add({
    //        title: 'SIP Registered',
    //        text: 'System is ready for Call',
    //        class_name: 'gritter-success'
    //    });

    toastr.success('System is ready for Call');
}

function userUnregistered() {
    //    $.gritter.add({
    //        title: 'SIP UnRegistered',
    //        text: 'Please check connectivity, post which the system will be ready for Call',
    //        class_name: 'gritter-error'
    //    });
    toastr.error('Please check connectivity, post which the system will be ready for Call');
}

function userDisconnect() {
    $("#lblsipunregistered").text("Call Disconnected due to network issue");
    //    $.gritter.add({
    //        title: 'Disconnected',
    //        text: 'Network Issue as been identified',
    //        class_name: 'gritter-error'
    //    });
    toastr.error('Network Issue as been identified');
}

function WebSocketConnect() {
    //    $.gritter.add({
    //        title: 'Web Socket Connected',
    //        text: 'Intialization Suucessfully Completed',
    //        class_name: 'gritter-success'
    //    });
    toastr.success('Intialization Successfully Completed');
}

function userRegisterationFailed() {
    //    $.gritter.add({
    //        title: 'User Registration Failed',
    //        text: 'Please Contact Administrator as your registration has been failed.',
    //        class_name: 'gritter-error'
    //    });
    toastr.error('Please Contact Administrator as your registration has been failed.');
}
function callAddStream() {

}
function callConfirmed(callLegInfo) {
    //alert("callConfirmed Function");
    var callingflag = $('#txtcallingflag').val()
    if (callingflag == 1) {
        var phoneNumber = $('#txtCallingNumbershandphone1').val(),
            agentId = $('#txtuserid').val(),
            agentName = $('#txtagentname').val(),
            customerid = $('#txtconid').val(),
            campaign_id = $('#txtcampaignid').val(),
            campaign_name = $('#txtcampaignname').val();
    }
    else if (callingflag == 2) {
        var phoneNumber = $('#txtCallingNumbershandphone2').val(),
            agentId = $('#txtuserid').val(),
            agentName = $('#txtagentname').val(),
            customerid = $('#txtconid').val(),
            campaign_id = $('#txtcampaignid').val(),
            campaign_name = $('#txtcampaignname').val();
    }
    else if (callingflag == 3) {
        var phoneNumber = $('#txtCallingNumberlandline').val(),
            agentId = $('#txtuserid').val(),
            agentName = $('#txtagentname').val(),
            customerid = $('#txtconid').val(),
            campaign_id = $('#txtcampaignid').val(),
            campaign_name = $('#txtcampaignname').val();
    }

    //    $.gritter.add({
    //        title: 'Call Confirmed',
    //        text: 'Calling In process to ' + phoneNumber,
    //        class_name: 'gritter-success'
    //    });
    toastr.success('Calling In process to ' + phoneNumber);
    callstartbtn();
    callLegInfo = callLegInfo.replace(/;/g, ',');
    console.log(callLegInfo);
    callData = JSON.parse(callLegInfo);
    console.log(callData);
    $("#callstarttime").val(timestamp);
    $("#customerPhone").val(callData.info[0].customerPhone);
    $("#customerId").val(callData.info[1].customerId);
    $("#leadsetId").val(callData.info[2].leadsetId);
    $("#leadsetName").val(callData.info[3].leadsetName);
    $("#campaignId").val(callData.info[4].campaignId);
    $("#campaignName").val(callData.info[5].campaignName);
    $("#processId").val(callData.info[6].processId);
    $("#processName").val(callData.info[7].processName);
    $("#agentId").val(callData.info[8].agentId);
    $("#crUd").val(callData.info[9].crUd);
    $("#rfUd1").val(callData.info[10].rfUd);
    $("#legType").val(callData.info[11].legType);
    $("#snUd").val(callData.info[12].snUd);
    $("#otUd").val(callData.info[13].otUd);
    $("#atEn").val(callData.info[14].atEn);
    $("#txSt").val(callData.info[15].txSt);
    $("#moc").val(callData.info[16].moc);
    //SaveCallLogdetails();

}

function callFailed() {
    var callingflag = $('#txtcallingflag').val()
    if (callingflag == 1) {
        var phoneNumber = $('#txtCallingNumbershandphone1').val(),
            agentId = $('#txtuserid').val(),
            agentName = $('#txtagentname').val(),
            customerid = $('#txtconid').val(),
            campaign_id = $('#txtcampaignid').val(),
            campaign_name = $('#txtcampaignname').val();
    }
    else if (callingflag == 2) {
        var phoneNumber = $('#txtCallingNumbershandphone2').val(),
            agentId = $('#txtuserid').val(),
            agentName = $('#txtagentname').val(),
            customerid = $('#txtconid').val(),
            campaign_id = $('#txtcampaignid').val(),
            campaign_name = $('#txtcampaignname').val();
    }
    else if (callingflag == 3) {
        var phoneNumber = $('#txtCallingNumberlandline').val(),
            agentId = $('#txtuserid').val(),
            agentName = $('#txtagentname').val(),
            customerid = $('#txtconid').val(),
            campaign_id = $('#txtcampaignid').val(),
            campaign_name = $('#txtcampaignname').val();
    }

    //    $.gritter.add({
    //        title: 'Call Failed',
    //        text: 'Call Failed to ' + phoneNumber,
    //        class_name: 'gritter-error'
    //    });

    toastr.error('Calling Failed to' + phoneNumber);
}

function holdCall() {
    var callingflag = $('#txtcallingflag').val()
    if (callingflag == 1) {
        document.getElementById("callEndBtn").style.display = "block";
        document.getElementById("callStartBtn").style.display = "none";
        document.getElementById("callhold").style.display = "none";
        document.getElementById("callunhold").style.display = "block";
    }
    else if (callingflag == 2) {
        document.getElementById("callEndBtn1").style.display = "block";
        document.getElementById("callStartBtn1").style.display = "none";
        document.getElementById("callhold1").style.display = "none";
        document.getElementById("callunhold1").style.display = "block";
    }
    else if (callingflag == 3) {
        document.getElementById("callEndBtn2").style.display = "block";
        document.getElementById("callStartBtn2").style.display = "none";
        document.getElementById("callhold2").style.display = "none";
        document.getElementById("callunhold2").style.display = "block";
    }



    var form_data = {
        "rfUd": callData.info[9].crUd,
        "crUd": callData.info[10].rfUd,
        "atEn": callData.info[14].atEn,
        "crNr": callData.info[0].customerPhone
    }
    $.post("https://49.248.16.102/voitekk/callingApis/hold", form_data,
        function (message) {
            console.log(message);
            $("#callhold").hide();
            holdbtn();
        }).error(function (data) {
            console.log("Hold call error");
            console.log(data);
        });
}

function unholdCall() {
    var callingflag = $('#txtcallingflag').val()
    if (callingflag == 1) {
        document.getElementById("callEndBtn").style.display = "block";
        document.getElementById("callStartBtn").style.display = "none";
        document.getElementById("callhold").style.display = "block";
        document.getElementById("callunhold").style.display = "none";
    }
    else if (callingflag == 2) {
        document.getElementById("callEndBtn1").style.display = "block";
        document.getElementById("callStartBtn1").style.display = "none";
        document.getElementById("callhold1").style.display = "block";
        document.getElementById("callunhold1").style.display = "none";
    }
    else if (callingflag == 3) {
        document.getElementById("callEndBtn2").style.display = "block";
        document.getElementById("callStartBtn2").style.display = "none";
        document.getElementById("callhold2").style.display = "block";
        document.getElementById("callunhold2").style.display = "none";
    }



    var form_data = {
        "atEn": callData.info[14].atEn,
        "atEnTy": "dynamic",
        "atId": callData.info[8].agentId,
        "atNm": $('#MainContainer_txtagentname').val(),
        "moc": callData.info[16].moc,
        "crNr": callData.info[0].customerPhone,
        "crId": $('#MainContainer_txtconid').val(),
        "cnId": callData.info[4].campaignId,
        "cnNm": callData.info[5].campaignName,
        "prId": callData.info[6].processId,
        "prNm": callData.info[7].processName,
        "rfUd": callData.info[10].rfUd,
        "crUd": callData.info[9].crUd
    }
    $.post("https://49.248.16.102/voitekk/callingApis/unhold", form_data, function (message) {
        console.log(message);
        unholdbtn();
    }).error(function (data) {
        console.log("Unhold call error");
        console.log(data);
    });

    if (callingflag == 1) {
        document.getElementById("callEndBtn").style.display = "block";
        document.getElementById("callStartBtn").style.display = "none";
        document.getElementById("callhold").style.display = "block";
        document.getElementById("callunhold").style.display = "none";
    }
    else if (callingflag == 2) {
        document.getElementById("callEndBtn1").style.display = "block";
        document.getElementById("callStartBtn1").style.display = "none";
        document.getElementById("callhold1").style.display = "block";
        document.getElementById("callunhold1").style.display = "none";
    }
    else if (callingflag == 3) {
        document.getElementById("callEndBtn2").style.display = "block";
        document.getElementById("callStartBtn2").style.display = "none";
        document.getElementById("callhold2").style.display = "block";
        document.getElementById("callunhold2").style.display = "none";
    }

}

function holdbtn() {
    var callingflag = $('#txtcallingflag').val()
    if (callingflag == 1) {
        document.getElementById("callEndBtn").style.display = "block";
        document.getElementById("callStartBtn").style.display = "none";
        document.getElementById("callhold").style.display = "none";
        document.getElementById("callunhold").style.display = "block";
    }
    else if (callingflag == 2) {
        document.getElementById("callEndBtn1").style.display = "block";
        document.getElementById("callStartBtn1").style.display = "none";
        document.getElementById("callhold1").style.display = "none";
        document.getElementById("callunhold1").style.display = "block";
    }
    else if (callingflag == 3) {
        document.getElementById("callEndBtn2").style.display = "block";
        document.getElementById("callStartBtn2").style.display = "none";
        document.getElementById("callhold2").style.display = "none";
        document.getElementById("callunhold2").style.display = "block";
    }



    //    setTimeout(function () {
    //        document.getElementById("callEndBtn").style.display = "block";
    //        document.getElementById("callStartBtn").style.display = "none";
    //        document.getElementById("callhold").style.display = "none";
    //        document.getElementById("callunhold").style.display = "block";
    //    }, 1000);

    //    setTimeout(function () {
    //        document.getElementById("callEndBtn").style.display = "block";
    //        document.getElementById("callStartBtn").style.display = "none";
    //        document.getElementById("callhold").style.display = "none";
    //        document.getElementById("callunhold").style.display = "block";
    //    }, 2000);

    //    setTimeout(function () {
    //        document.getElementById("callEndBtn").style.display = "block";
    //        document.getElementById("callStartBtn").style.display = "none";
    //        document.getElementById("callhold").style.display = "none";
    //        document.getElementById("callunhold").style.display = "block";
    //    }, 3000);
}

function unholdbtn() {


    var callingflag = $('#txtcallingflag').val()
    if (callingflag == 1) {
        document.getElementById("callEndBtn").style.display = "block";
        document.getElementById("callStartBtn").style.display = "none";
        document.getElementById("callhold").style.display = "block";
        document.getElementById("callunhold").style.display = "none";
    }
    else if (callingflag == 2) {
        document.getElementById("callEndBtn1").style.display = "block";
        document.getElementById("callStartBtn1").style.display = "none";
        document.getElementById("callhold1").style.display = "block";
        document.getElementById("callunhold1").style.display = "none";
    }
    else if (callingflag == 3) {
        document.getElementById("callEndBtn2").style.display = "block";
        document.getElementById("callStartBtn2").style.display = "none";
        document.getElementById("callhold2").style.display = "block";
        document.getElementById("callunhold2").style.display = "none";
    }

    //    setTimeout(function () {
    //        document.getElementById("callEndBtn").style.display = "block";
    //        document.getElementById("callStartBtn").style.display = "none";
    //        document.getElementById("callhold").style.display = "block";
    //        document.getElementById("callunhold").style.display = "none";
    //    }, 1000);
    //    setTimeout(function () {
    //        document.getElementById("callEndBtn").style.display = "block";
    //        document.getElementById("callStartBtn").style.display = "none";
    //        document.getElementById("callhold").style.display = "block";
    //        document.getElementById("callunhold").style.display = "none";
    //    }, 2000);
    //    setTimeout(function () {
    //        document.getElementById("callEndBtn").style.display = "block";
    //        document.getElementById("callStartBtn").style.display = "none";
    //        document.getElementById("callhold").style.display = "block";
    //        document.getElementById("callunhold").style.display = "none";
    //    }, 3000);


}




function SaveCallLogdetails() {    //To Save Call Log Data
    var UID = ReadCookie();
    var flag = "1";
    var Mode = "1001";
    var Mode_Name = "System Dial";
    var Phase = "Campaign";
    var Feedback_ID = "";
    var Contact_Type_ID_Called = "01";
    var Contact_Number_Called = $("#customerPhone").val();
    var Contact_Id = $("#customerId").val();
    var Lead_Opportunity_ID = $("#leadsetId").val();
    var Lead_Name = $("#leadsetName").val();
    var Campaign_Id = $("#campaignId").val();
    var Campaign_Name = $("#campaignName").val();
    var Process_Id = $("#processId").val();
    var Process_Name = $("#processName").val();
    var User_Id = $("#agentId").val();
    var CRUD = $("#crUd").val();
    var Recording_Link = $("#rfUd").val();
    var LegType = $("#legType").val();
    var SNUD = $("#snUd").val();
    var OTUD = $("#otUd").val();
    var Agent_User_Extension_Used = $("#atEn").val();
    var TXST = $("#txSt").val();
    var MOC = $("#moc").val();
    var Call_Start_Time = $("#callstarttime").val();
    var Call_End_Time = $("#callendtime").val();
    var Total_Call_Duration = "";
    var Call_Status = "01";
    var errormsg = "";


    console.log(Contact_Number_Called);
    console.log(Contact_Id);
    console.log(Lead_Opportunity_ID);
//    alert(Recording_Link);
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/SaveCallLog",
        contentType: "application/json; charset=utf-8",
        data: '{"Flag":"' + flag + '","Mode_ID":"' + Mode + '", "Mode_Name":"' + Mode_Name + '", "Phase":"' + Phase + '", "Feedback_ID":"' + Feedback_ID + '", "Contact_Type_ID_Called":"' + Contact_Type_ID_Called + '", "Contact_Number_Called":"' + Contact_Number_Called + '", "Contact_Id":"' + Contact_Id + '", "Lead_Opportunity_ID":"' + Lead_Opportunity_ID + '", "Lead_Name":"' + Lead_Name + '", "Campaign_Id":"' + Campaign_Id + '", "Campaign_Name":"' + Campaign_Name + '", "Process_Id":"' + Process_Id + '", "Process_Name":"' + Process_Name + '", "User_Id":"' + User_Id + '", "CRUD":"' + CRUD + '", "Recording_Link":"' + Recording_Link + '", "LegType":"' + LegType + '", "SNUD":"' + SNUD + '", "OTUD":"' + OTUD + '", "Agent_User_Extension_Used":"' + Agent_User_Extension_Used + '", "TXST":"' + TXST + '", "MOC":"' + MOC + '", "Call_Start_Time":"' + Call_Start_Time + '", "Call_End_Time":"' + Call_End_Time + '", "Total_Call_Duration":"' + Total_Call_Duration + '", "Call_Status":"' + Call_Status + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                if (obj.result == "1") {
                    toastr.success('Call Log Saved');
                }
                else {
                    toastr.error('Error!!!');
                }
            });
            if (data.d == '') {
                toastr.error('Call Log Not Saved');

            }
            else {

            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');

        })
    });
};


function ViewStudentDetailModal(Recordcode) {   //followup click in grid
    //controlVisiblity('FollowUp');
    $('#followupModal').modal("show");
    $('#previousfollowup').modal("hide");
    $('.date-picker').datepicker({
        dateFormat: "dd-mm-yy",
        yearRange: "-10:+10",
        changeMonth: true,
        changeYear: true
    });
    var Leadflag = document.getElementById('lblLeadflag').value;
    var Opportunityflag = document.getElementById('lblOpportunityflag').value;
    var Admissionflag = document.getElementById('lblAdmissionflag').value;
    $("#ddlInteractedRel").val(0).change();
    $("#ddlFollowupStatus").val(0).change();
    $("#ddlLostFollowupReason").val(0).change();
    $("#ddlRemarkConclusion").val(0).change();
    document.getElementById("txtInteractedWith").value = "";
    document.getElementById("txtFollowupDate1").value = "";
    document.getElementById('lblInteractedrel').innerHTML = "";
    document.getElementById('lblFollowupstatus').innerHTML = "";
    document.getElementById('lblLostFollowupReason').innerHTML = "";
    document.getElementById('lblRemarkConclusion').innerHTML = "";
    document.getElementById('lblFeedback').innerHTML = "";
    document.getElementById('lblNextFollowupdate').innerHTML = "";
    $('[data-id="ddlInteractedRel"]').removeClass('errorClass');
    $('[data-id="ddlFollowupStatus"]').removeClass('errorClass');
    $('[data-id="ddlLostFollowupReason"]').removeClass('errorClass');
    $('[data-id="ddlRemarkConclusion"]').removeClass('errorClass');
    $("#txtFeedBack").removeClass('errorClass');
    $("#txtFollowupDate").removeClass('errorClass');
    $('[data-id="ddlInteractedRel"]').removeClass('sucessClass');
    $('[data-id="ddlFollowupStatus"]').removeClass('sucessClass');
    $('[data-id="ddlLostFollowupReason"]').removeClass('sucessClass');
    $('[data-id="ddlRemarkConclusion"]').removeClass('sucessClass');
    $("#txtFeedBack").removeClass('sucessClass');
    $("#txtFollowupDate").removeClass('sucessClass');
    $("#trLostFollowupReason").css('display', 'none');

    var HandlededBy = ReadCookieName();
    document.getElementById('lblHandledBy').innerHTML = HandlededBy;
    document.getElementById("txtFeedBack").value = "";
    document.getElementById("txtFollowupDate1").value = "";
    //waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/ViewStudentDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"RecordId":"' + Recordcode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                if (obj.LeadFlag != '0' && obj.opportunityFlag != '0' && obj.AdmissionFlag != '0') {
                    toastr.success('This Contact Has Taken Admission');
                }

                document.getElementById('lblLeadflag').innerHTML = obj.LeadFlag;
                document.getElementById('lblOpportunityflag').innerHTML = obj.opportunityFlag;
                document.getElementById('lblAdmissionflag').innerHTML = obj.AdmissionFlag;
                document.getElementById('lblFollowupStudentName').innerHTML = obj.StudentName;
                document.getElementById('lblFollowupEmail').innerHTML = obj.Emailid;
                document.getElementById('lblFollowupGender').innerHTML = obj.Gender;
                document.getElementById('lblFollowupMobileNo').innerHTML = obj.Handphone1;
                document.getElementById('lblFollowupCampaign').innerHTML = obj.Campaign;

                // ViewStudent_CampaignFollowup(Recordcode);
                //ViewStudent_CampaignEventFollowup(Recordcode);
            })

            if (data.d == '') {
                //waitingDialog.hide();
            }
            else {
                //waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            //waitingDialog.hide();
        })
    });
};

function SaveFollowupData() {    //To save Data In Follow up Div
    //alert("Save");
    var InteractedWith = document.getElementById("txtInteractedWith").value;
    var InteractedRel = document.getElementById("ddlInteractedRel").value;
    var FollowupStatus = document.getElementById("ddlFollowupStatus").value;
    var LostFollowupReason = document.getElementById("ddlLostFollowupReason").value;
    var RemarkConclusion = document.getElementById("ddlRemarkConclusion").value;
    var FeedBack = document.getElementById("txtFeedBack").value;
    var FollowupDate = document.getElementById("txtFollowupDate1").value;
    var errormsg = "";
    var UID = ReadCookie();
    //var RecNo = document.getElementById("lblPKey3").value;
    var RecNo = $("#txtrecordno").val();
    //alert(RecNo);
    var v = "0";

    if (InteractedRel == "0") {
        document.getElementById('lblInteractedrel').innerHTML = "Select Interacted Rel.";
        $('[data-id="ddlInteractedRel"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblInteractedrel').innerHTML = "";
        $('[data-id="ddlInteractedRel"]').addClass('sucessClass');
    }

    if (FollowupStatus == "0") {
        document.getElementById('lblFollowupstatus').innerHTML = "Select Followup Status";
        $('[data-id="ddlFollowupStatus"]').addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblFollowupstatus').innerHTML = "";
        $('[data-id="ddlFollowupStatus"]').addClass('sucessClass');
    }

    if (FollowupStatus == "01") {//if Folloup status is Lost then check FollowupLost Reason 
        if (LostFollowupReason == "0") {
            document.getElementById('lblLostFollowupReason').innerHTML = "Select Lost Followup Reason";
            $('[data-id="ddlLostFollowupReason"]').addClass('errorClass');
            v = "1";
        }
        else {
            document.getElementById('lblLostFollowupReason').innerHTML = "";
            $('[data-id="ddlLostFollowupReason"]').addClass('sucessClass');
        }
        RemarkConclusion = "";
        FollowupDate = "";
    }
    else {
        LostFollowupReason = "";

        if (RemarkConclusion == "0") {
            document.getElementById('lblRemarkConclusion').innerHTML = "Select Remark Conclusion";
            $('[data-id="ddlRemarkConclusion"]').addClass('errorClass');
            v = "1";
        }
        else {
            document.getElementById('lblRemarkConclusion').innerHTML = "";
            $('[data-id="ddlRemarkConclusion"]').addClass('sucessClass');
        }

        if (FollowupDate == "") {
            document.getElementById('lblNextFollowupdate').innerHTML = "Enter Next followup Date";
            $("#txtFollowupDate").addClass('errorClass');
            v = "1";
        }
        else {
            document.getElementById('lblNextFollowupdate').innerHTML = "";
            $("#txtFollowupDate").addClass('sucessClass');
        }
    }



    if (FeedBack == "") {
        document.getElementById('lblFeedback').innerHTML = "Enter Feedback";
        $("#txtFeedBack").addClass('errorClass');
        v = "1";
    }
    else {
        document.getElementById('lblFeedback').innerHTML = "";
        $("#txtFeedBack").addClass('sucessClass');
    }
    if (v == "1") {
        return false;
    }

    //waitingDialog.show('Please wait...', { dialogSize: 'sm', progressType: 'warning' });
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/FollowupSaveDetail",
        contentType: "application/json; charset=utf-8",
        data: '{"Record_Id":"' + RecNo + '","Interacted_With":"' + InteractedWith + '", "Interacted_Relation":"' + InteractedRel + '", "Feedback":"' + FeedBack + '", "Updated_By":"' + UID + '", "NextFollowupDate":"' + FollowupDate + '", "CampaignFollowup__Status":"' + FollowupStatus + '", "LostFollowup_Reason":"' + LostFollowupReason + '", "Remark_Conclusion":"' + RemarkConclusion + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $(data.d).each(function (index, obj) {
                document.getElementById("lblCampaign_Contact_Code").value = obj.Campaign_Contact_Code
                document.getElementById('lblLead_Code').value = obj.Lead_Code;
                document.getElementById('lblOpportunity_Code').value = obj.Opportunity_Code;
                document.getElementById('lblAccount_Id').value = obj.Account_id;
                var campaignid = $("#ddlcampaignmultiple").val();
                ViewCampaignCountData(campaignid);
                $('#followupModal').modal("hide");
                $('#DescModal').modal("hide");
                toastr.success('Followup Saved');

                //                //if Lead is not created then Lead creation Confirmation
                //                if (obj.Lead_Code == 'Blank') {
                //                    //alert('LeadCode');
                //                    document.getElementById('lblConvertHeader').innerHTML = 'Convert To Lead';
                //                    document.getElementById('lblConvertDetail').innerHTML = 'Do you want to convert to Lead?';
                //                    controlVisiblity('ConvertToLeadOppAdmission');
                //                } //if Opportunity is not created then Opportunity creation Confirmation
                //                else if (obj.Opportunity_Code == 'Blank') {
                //                    document.getElementById('lblConvertHeader').innerHTML = 'Convert To Opportunity';
                //                    document.getElementById('lblConvertDetail').innerHTML = 'Do you want to convert to Opportunity?';
                //                    controlVisiblity('ConvertToLeadOppAdmission');
                //                } //if Admission is not created then Admission creation Confirmation
                //                else if (obj.Account_id == 'Blank') {
                //                    document.getElementById('lblConvertHeader').innerHTML = 'Book Admission';
                //                    document.getElementById('lblConvertDetail').innerHTML = 'Do you want to Book Admission?';
                //                    controlVisiblity('ConvertToLeadOppAdmission');
                //                } //if all done then Campaign count div
                //                else {
                //                    var CId = document.getElementById("lblCampaignDetailcode").value;
                //                    ViewCampaignCountData(CId);
                //                    GetCampaignCountDetailsData();
                //                    controlVisiblity('CampaignCountSearch');
                //                }
                //sweetAlert('Followup Saved Sucessfully', '', 'success');
            });
            if (data.d == '') {
                toastr.error('Followup Not Saved');
                //waitingDialog.hide();
            }
            else {
                //waitingDialog.hide();
            }
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
            //waitingDialog.hide();
        })
    });
};


function ViewStudent_CampaignFollowup(Recordcode) {   //followup click in grid
    $('#followupModal').modal("hide");
    $('#previousfollowup').modal("show");

    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/ViewStudent_CampaignFollowup",
        contentType: "application/json; charset=utf-8",
        data: '{"RecordId":"' + Recordcode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TBodyFollowupData').html('');
            $(data.d).each(function (index, obj) {
                $('#TBodyFollowupData').append('<tr><td style="width:100%;">' + obj.FollowupDetail + '</br>' + obj.FollowupDetail1 + '</td></tr>');
            })
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
        })
    });
}

function ViewStudent_CampaignEventFollowup(Recordcode) {   //followup click in grid (Event Followup)
    $.ajax({
        type: 'POST',
        url: "./WebMethods/WcCampaign.asmx/ViewStudent_CampaignEventFollowup",
        contentType: "application/json; charset=utf-8",
        data: '{"RecordId":"' + Recordcode + '"}',
        dataType: "json",
        async: false,
        success: (function (data) {
            $('#TBodyEventFollowupData').html('');
            $(data.d).each(function (index, obj) {
                $('#TBodyEventFollowupData').append('<tr><td style="width:100%;"><b>Event- </b>' + obj.Event_Name + '<br><b>Feedback Header- </b>' + obj.Event_Feedback + '<br><b>Feedback Value- </b>' + obj.Event_FeedbackValue + '</td></tr>');
            })
        }),
        error: (function () {
            toastr.error('Something gone Wrong....');
        })
    });
}