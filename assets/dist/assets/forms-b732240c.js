import{m as y}from"./module.esm-e3630760.js";let T=$("#sprout-relations-modal"),F=new Garnish.Modal(T,{autoShow:!1,closeOtherModals:!1,resizable:!0,onShow:function(){let e={elementId:document.getElementById("sprout-relations-btn").dataset.elementId};Craft.sendActionRequest("POST","sprout-module-core/source-element-relations/get-relations",{data:e}).then(t=>{t.data.success&&T.html(t.data.html)}).catch(()=>{})},onHide:function(){}}),v=document.querySelector("#sprout-relations-btn");v!==null&&v.addEventListener("click",function(n){n.preventDefault(),F.show()},!1);const C=n=>({formId:n,lastUpdatedFormFieldUid:null,sourceFields:[],tabs:[],fields:[],uiSettings:[],fieldLayoutUid:null,selectedTabUid:null,editTabUid:null,editFieldUid:null,dragOrigin:null,DragOrigins:{sourceField:"source-field",layoutField:"layout-field",layoutTabNav:"layout-tab-nav"},isDraggingTabUid:null,isDragOverTabUid:null,isDraggingFormFieldUid:null,isDragOverFormFieldUid:null,init(){let e=this;Craft.sendActionRequest("POST","sprout-module-forms/forms/get-submission-field-layout",{data:{formId:this.formId}}).then(i=>{e.tabs=i.data.layout.tabs,e.fieldLayoutUid=i.data.layout.uid,e.selectedTabUid=e.tabs[0].uid??null}).catch(()=>{}),window.formBuilder=this;let t=JSON.parse(this.$refs.formBuilder.dataset.sourceFields);for(const i of t)this.sourceFields.push(i)},get fieldLayoutInputValue(){let e={};if(this.tabs.length&&!this.tabs[0].elements.length)return[];let t=[];for(const i of this.tabs){let s=[];for(const a of i.elements){let o=this.getFormFieldAttributes(a);s.push(o)}t.push({id:i.uid,uid:i.uid,name:i.name,sortOrder:null,userCondition:null,elementCondition:null,elements:s})}return e.tabs=t,JSON.stringify(e)},getFormFieldAttributes(e){const{uiSettings:t,...i}=e;return i},dragStartLayoutTabNav(e){e.dataTransfer.setData("sprout/origin-page-tab-uid",e.target.dataset.tabUid),this.dragOrigin=this.DragOrigins.layoutTabNav,this.isDraggingTabUid=e.target.dataset.tabUid},dragEndLayoutTabNav(e){this.dragOrigin=null,this.isDraggingTabUid=null,this.isDragOverTabUid=null},dragEnterLayoutTabNav(e){e.target.classList.add("no-pointer-events")},dragLeaveLayoutTabNav(e){e.target.classList.remove("no-pointer-events")},dragOverLayoutTabNav(e){let t=this;this.dragOrigin,this.DragOrigins.layoutTabNav,(this.dragOrigin===this.DragOrigins.sourceField||this.dragOrigin===this.DragOrigins.layoutField)&&setTimeout(function(){t.selectedTabUid=e.target.dataset.tabUid},1e3)},dropOnLayoutTabNav(e){let t=this;e.target.classList.remove("no-pointer-events");let i=e.dataTransfer.getData("sprout/origin-page-tab-uid"),s=e.target.dataset.tabUid;if(this.dragOrigin===this.DragOrigins.layoutTabNav&&(this.updateTabPosition(i,s),this.selectedTabUid=i),this.dragOrigin===this.DragOrigins.sourceField){let a=e.dataTransfer.getData("sprout/field-type");this.addFieldToLayoutTab(a)}this.dragOrigin===this.DragOrigins.layoutField&&this.updateFieldPosition(i,s,t.isDraggingFormFieldUid)},dragStartSourceField(e){this.dragOrigin=this.DragOrigins.sourceField,e.dataTransfer.setData("sprout/field-type",e.target.dataset.type)},dragEndSourceField(e){this.isDraggingFormFieldUid=null,this.isDragOverFormFieldUid=null},dragStartLayoutField(e){e.dataTransfer.setData("sprout/origin-page-tab-uid",this.selectedTabUid),e.dataTransfer.setData("sprout/field-type",e.target.dataset.type),this.dragOrigin=this.DragOrigins.layoutField,this.isDraggingTabUid=e.target.dataset.tabUid,this.isDraggingFormFieldUid=e.target.dataset.fieldUid},dragEndLayoutField(e){this.isDraggingFormFieldUid=null,this.isDragOverFormFieldUid=null},dragEnterLayoutTabBody(e){this.isDragOverTabUid=this.selectedTabUid},dragLeaveLayoutTabBody(e){this.isDragOverTabUid=null},dropOnLayoutTabBody(e){let t=this;e.target.classList.remove("no-pointer-events");let i=e.dataTransfer.getData("sprout/field-type"),s=e.dataTransfer.getData("sprout/origin-page-tab-uid");if(this.dragOrigin===this.DragOrigins.sourceField&&this.addFieldToLayoutTab(i),this.dragOrigin===this.DragOrigins.layoutField){let a=e.target.dataset.fieldUid;this.updateFieldPosition(s,this.selectedTabUid,t.isDraggingFormFieldUid,a)}},dragEnterLayoutField(e){e.target.classList.add("no-pointer-events")},dragLeaveLayoutField(e){e.target.classList.remove("no-pointer-events")},dropOnExistingLayoutField(e){let t=this;e.target.classList.remove("no-pointer-events");let i=e.dataTransfer.getData("sprout/field-type"),s=e.dataTransfer.getData("sprout/origin-page-tab-uid"),a=e.target.dataset.tabUid,o=e.target.dataset.fieldUid;this.dragOrigin===this.DragOrigins.sourceField&&this.addFieldToLayoutTab(i,o),this.dragOrigin===this.DragOrigins.layoutField&&this.updateFieldPosition(s,a,t.isDraggingFormFieldUid,o)},dragEnterFieldLayoutEndZone(e){},dragLeaveFieldLayoutEndZone(e){},dropOnLayoutEndZone(e){let t=this;e.target.classList.remove("no-pointer-events");let i=e.dataTransfer.getData("sprout/field-type"),s=e.dataTransfer.getData("sprout/origin-page-tab-uid"),a=e.target.dataset.tabUid,o=e.target.dataset.fieldUid;this.dragOrigin===this.DragOrigins.sourceField&&this.addFieldToLayoutTab(i),this.dragOrigin===this.DragOrigins.layoutField&&this.updateFieldPosition(s,a,t.isDraggingFormFieldUid,o)},dragOverLayoutTabBody(e){e.dataTransfer.types.includes("sprout/field-type")&&event.preventDefault()},dragOverLayoutField(e){e.dataTransfer.types.includes("sprout/field-type")&&event.preventDefault()},isOverFieldLayoutEndZone(e){e.dataTransfer.types.includes("sprout/field-type")&&event.preventDefault()},getFieldsByGroup(e){return this.sourceFields.filter(t=>t.groupName===e)},getFieldByType(e){return this.sourceFields.filter(t=>t.field.type===e)[0]??null},getTabIndexByTabUid(e){return this.tabs.findIndex(t=>t.uid===e)},getFieldIndexByFieldUid(e,t){return e.elements.findIndex(i=>i.fieldUid===t)},updateTabSettings(e,t){let i=this.getTabIndexByTabUid(e);Object.entries(t).forEach(([s,a])=>{this.tabs[i][s]=a}),this.tabs[i].name||(this.tabs[i].name="Page")},updateFieldSettings(e,t){let i=this.getTabIndexByTabUid(this.selectedTabUid),s=this.tabs[i],a=this.getFieldIndexByFieldUid(s,e),o=s.elements[a];o.name=t.name,o.instructions=t.instructions,o.required=t.required,o.settings=t.settings,s.elements[a]=o},updateTabPosition(e,t=null){let i=this.getTabIndexByTabUid(t),s=this.getTabIndexByTabUid(e),a=this.tabs[s];this.tabs.splice(s,1),t?this.tabs.splice(i,0,a):this.tabs.push(a),this.lastUpdatedTabUid=a.uid},updateFieldPosition(e,t,i,s=null){let a=this.getTabIndexByTabUid(e),o=this.tabs[a],d=this.getTabIndexByTabUid(t),r=this.tabs[d];r||(r=o);let l=this.getFieldIndexByFieldUid(o,i),u=o.elements[l];if(o.elements.splice(l,1),s){let g=this.getFieldIndexByFieldUid(r,s);r.elements.splice(g,0,u)}else r.elements.push(u);this.tabs[d]=r,this.lastUpdatedFormFieldUid=u.uid,this.resetLastUpdated()},addFormPageButton(){let e=Craft.uuid(),t={uid:e,name:"New Page",userCondition:null,elementCondition:null,elements:[]};this.tabs.push(t),this.selectedTabUid=e},addFieldToLayoutTab(e,t=null){let i=this.getFieldByType(e);i.field.type=e,this.dragOrigin===this.DragOrigins.sourceField&&(i.field.name=i.uiSettings.displayName,i.field.handle=i.uiSettings.defaultHandle+"_"+Craft.randomString(4),i.field.uid=Craft.uuid()),this.dragOrigin,this.DragOrigins.layoutField;let s=i.field.uid,a=this.getTabIndexByTabUid(this.selectedTabUid),o=this.getLayoutElement(s,i.field,i.uiSettings);if(this.tabs[a].elements.push(o),t){let d=this.getTabIndexByTabUid(this.selectedTabUid),r=this.tabs[d],l=this.getFieldIndexByFieldUid(r,s),u=r.elements[l];r.elements.splice(l,1);let g=this.getFieldIndexByFieldUid(r,t);r.elements.splice(g,0,u),this.tabs[d]=r,this.lastUpdatedFormFieldUid=u.uid,this.resetLastUpdated()}},getLayoutElement(e,t,i){return{type:"BarrelStrength\\Sprout\\forms\\submissions\\CustomFormField",required:!1,width:100,uid:Craft.uuid(),userCondition:null,elementCondition:null,fieldUid:e,field:t,uiSettings:i}},resetLastUpdated(){let e=this;setTimeout(function(){e.lastUpdatedFormFieldUid=null},300)},isBefore(e,t){if(t.parentNode===e.parentNode){for(let i=e.previousSibling;i&&i.nodeType!==9;i=i.previousSibling)if(i===t)return!0}return!1},editFormTab(e){let t=this;this.editTabUid=e.uid,Craft.sendActionRequest("POST","sprout-module-forms/forms/get-form-tab-settings-html",{data:{formId:this.formId,tab:e}}).then(i=>{const s=$("<div/>",{class:"fld-element-settings-body"}),a=$("<div/>",{class:"fields"}).appendTo(s),o=$("<div/>",{class:"fld-element-settings-footer"}),d=Craft.ui.createButton({class:"icon",attr:{"data-icon":"trash"},label:Craft.t("app","Remove"),spinner:!0});d.attr("data-icon","trash");const r=Craft.ui.createButton({data:{trashed:!0},label:Craft.t("app","Close"),spinner:!0}),l=Craft.ui.createSubmitButton({class:"secondary",label:Craft.t("app","Apply"),spinner:!0});d.appendTo(o),$("<div/>",{class:"flex-grow"}).appendTo(o),r.appendTo(o),l.appendTo(o);let u=t.swapPlaceholders(i.data.settingsHtml,i.data.tabUid);$(u).appendTo(a);const g=s.add(o);$(".sprout-conditionbuilder-slideout").remove();const f=new Craft.Slideout(g,{containerElement:"form",containerAttributes:{method:"post",action:"",class:"fld-element-settings slideout sprout-conditionbuilder-slideout",id:"sprout-tab-modal"}}),p=f.$container;let m=t.swapPlaceholders(i.data.tabSettingsJs,i.data.tabUid);Craft.appendBodyHtml(m),p.on("submit",function(c){c.preventDefault();let b=new FormData(p[0]);Craft.sendActionRequest("POST","sprout-module-forms/forms/get-form-tab-object",{data:b}).then(h=>{t.updateTabSettings(t.editTabUid,{name:h.data.name,userCondition:h.data.userCondition,elementCondition:h.data.elementCondition})}),f.close()}),d.on("click",()=>{if(t.tabs.length===1){Craft.cp.displayNotice(Craft.t("sprout-module-forms","Form must contain at least one tab."));return}let c=t.getTabIndexByTabUid(t.selectedTabUid),b=c-1>=0?t.tabs[c-1].uid:t.tabs[c+1].uid;t.tabs.splice(c,1);let h=t.getTabIndexByTabUid(b);t.selectedTabUid=t.tabs[h].uid,t.editTabUid=t.selectedTabUid,f.close()}),r.on("click",()=>{f.close(),t.editFieldUid=null})}).catch(()=>{})},editFormField(e){let t=this;t.editFieldUid=e.fieldUid,Craft.sendActionRequest("POST","sprout-module-forms/forms/get-form-field-settings-html",{data:{formId:this.formId,layoutElement:e}}).then(i=>{const s=$("<div/>",{class:"fld-element-settings-body"}),a=$("<div/>",{class:"fields"}).appendTo(s),o=$("<div/>",{class:"fld-element-settings-footer"}),d=Craft.ui.createButton({class:"icon",attr:{"data-icon":"trash"},label:Craft.t("app","Remove"),spinner:!0});d.attr("data-icon","trash");const r=Craft.ui.createButton({data:{trashed:!0},label:Craft.t("app","Close"),spinner:!0}),l=Craft.ui.createSubmitButton({class:"secondary",label:Craft.t("app","Apply"),spinner:!0});d.appendTo(o),$("<div/>",{class:"flex-grow"}).appendTo(o),r.appendTo(o),l.appendTo(o);let u=t.swapPlaceholders(i.data.settingsHtml,i.data.fieldUid);$(i.data.requiredSettingsHtml).appendTo(a),$(u).appendTo(a),$(i.data.additionalSettingsHtml).appendTo(a);const g=s.add(o);$(".sprout-conditionbuilder-slideout").remove();const f=new Craft.Slideout(g,{containerElement:"form",containerAttributes:{method:"post",action:"",class:"fld-element-settings slideout sprout-conditionbuilder-slideout",id:"sprout-field-modal"}}),p=f.$container;Craft.initUiElements(s);let m=t.swapPlaceholders(i.data.fieldSettingsJs,i.data.fieldUid);Craft.appendBodyHtml(m),p.on("submit",function(c){c.preventDefault();let b=new FormData(p[0]);Craft.sendActionRequest("POST","sprout-module-forms/forms/get-form-field-object",{data:b}).then(h=>{t.updateFieldSettings(t.editFieldUid,JSON.parse(h.data.fieldSettings))}),f.close()}),d.on("click",()=>{let c=t.getTabIndexByTabUid(t.selectedTabUid),b=t.tabs[c],h=t.getFieldIndexByFieldUid(b,t.editFieldUid);t.tabs[c].elements.splice(h,1),t.editFieldUid=null,f.close()}),r.on("click",()=>{f.close(),t.editFieldUid=null})}).catch(i=>{})},swapPlaceholders(e,t){const i=`condition${Math.floor(Math.random()*1e6)}`;return e.replace(/__ID__/g,i).replace(/__SOURCE_KEY__(?=-)/g,Craft.formatInputId('"'+t+'"')).replace(/__SOURCE_KEY__/g,t)}}),S=n=>({element:n,dragHover:!1,init(){},sourceHtml(){return`<div
class="source-field"
draggable="true"
x-bind:class="[dragHover ? 'drag-hover' : '', element.field.sortOrder % 2 == 0 ? 'even' : 'odd']"
x-on:mouseover="dragHover = true"
x-on:mouseleave="dragHover = false"
x-on:dragstart.self="dragStartSourceField"
x-on:dragend.self="dragEndSourceField"
x-bind:data-type="element.field.type"><h3><span x-html="element.uiSettings.icon" class="sproutforms-icon"></span><span x-text="element.field.name" x-bind:data-handle="element.field.name" class="sproutforms-sourcefield-name"></span></h3></div>`}});window.Alpine=y;y.data("FormBuilder",C);y.data("FormField",S);y.start();/*
 * @link https://sprout.barrelstrengthdesign.com
 * @copyright Copyright (c) Barrel Strength Design LLC
 * @license https://craftcms.github.io/license
 */typeof Craft.SproutForms>"u"&&(Craft.SproutForms={});(function(n){Craft.SproutForms.FormSettings=Garnish.Base.extend({options:null,modal:null,$lightswitches:null,init:function(){this.initButtons()},initButtons:function(){const e=this;n("a[id^='sproutform-integration']").each(function(t,i){const s=n(i).data("integrationid");s&&e.addListener(n("#sproutform-integration-"+s),"activate","editIntegration")}),this.$lightswitches=n(".sproutforms-integration-row .lightswitch"),this.addListener(this.$lightswitches,"click","onEnableIntegration"),this.modal=Craft.SproutForms.IntegrationModal.getInstance(),this.modal.on("saveIntegration",n.proxy(function(t){const i=t.integration;this.resetIntegration(i)},this)),this.addListener(n("#integrationsOptions"),"change","createDefaultIntegration")},onEnableIntegration:function(e){const t=e.currentTarget,i=t.id;let s=n(t).attr("aria-checked");s=s==="true"?1:0;const a=n("#formId").val(),o={integrationId:i,enabled:s,formId:a};Craft.postActionRequest("sprout-module-forms/form-integrations/enable-integration",o,n.proxy(function(d,r){r==="success"&&d.success?Craft.cp.displayNotice(Craft.t("sprout","Integration updated.")):Craft.cp.displayError(Craft.t("sprout","Unable to update integration"))},this))},resetIntegration:function(e){const t=n("#sproutform-integration-"+e.id),i=n("#integration-enabled-"+e.id),s=e.enabled==="1",a=i.attr("aria-checked")==="true";s!==a&&(i.attr("aria-checked",""+s),s?i.addClass("on"):i.removeClass("on")),t.html(e.name)},createDefaultIntegration:function(e){const t=this,i=n("#sproutforms-integrations-table tbody"),s=n("#integrationsOptions").val(),a=n("#formId").val();if(s==="")return;const o={type:s,formId:a,sendRule:"*"};Craft.postActionRequest("sprout-module-forms/form-integrations/save-integration",o,n.proxy(function(d,r){if(r==="success"){const l=d.integration;i.append('<tr class="field sproutforms-integration-row" id ="sproutforms-integration-row-'+l.id+'"><td class="heading"><a href="#" id ="sproutform-integration-'+l.id+'" data-integrationid="'+l.id+'">'+l.name+'</a></td><td><div class="lightswitch small" tabindex="0" data-value="1" role="checkbox" aria-checked="false" id ="integration-enabled-'+l.id+'"><div class="lightswitch-container"><div class="handle"></div></div><input type="hidden" name="" value=""></div></td></tr>'),t.addListener(n("#sproutform-integration-"+l.id),"activate","editIntegration"),n("#integrationsOptions").val("");const u=n("#integration-enabled-"+l.id);u.lightswitch(),t.addListener(u,"click","onEnableIntegration")}},this))},editIntegration:function(e){const t=e.currentTarget,i=n(t).data("integrationid");this.base(n(t)),this.modal.editIntegration(i)}})})(jQuery);/*
 * @link https://sprout.barrelstrengthdesign.com
 * @copyright Copyright (c) Barrel Strength Design LLC
 * @license https://craftcms.github.io/license
 */class I{constructor(e){const t=this;this.integrationType=typeof e.integrationType<"u"?e.integrationType:"",this.disableOptions(),this.updateAllFieldSelects(),this.updateTargetFieldsOnChange=typeof e.updateTargetFieldsOnChange<"u"?e.updateTargetFieldsOnChange:[],this.updateTargetFieldsOnChange.forEach(function(i){$(i).change(function(){t.updateAllFieldSelects()})})}disableOptions(){const e=this,i={integrationId:$("#integrationId").val()};return Craft.postActionRequest("sprout-module-forms/form-integrations/get-source-form-fields",i,$.proxy(function(s,a){if(a==="success"&&s.success){const d=s.sourceFormFields;$("tbody .formField").each(function(r){const l=$(this);l.empty();const u=d[r].label,g=d[r].value;l.append('<div style="display:none;"><select readonly name="settings['+e.integrationType+"][fieldMapping]["+r+'][sourceFormField]"><option selected value="'+g+'">'+u+'</option></select></div><div style="padding: 7px 10px;font-size: 12px;color:#8f98a3;">'+u+' <span class="code">('+g+")</span></div>")})}else Craft.cp.displayError(Craft.t("sprout","Unable to get the Form fields"))},this)),null}updateAllFieldSelects(){const t="table#settings-"+this.integrationType.replace(/\\/g,"-")+"-fieldMapping tr";$(t).find("td:eq(2),th:eq(2)").remove(),$(t).find("td:eq(0),th:eq(0)").css("width","50%"),$(t).find("td:eq(1),th:eq(1)").css("width","50%");const i=this.getCurrentRows("tbody .targetFields"),s=$("#integrationId").closest("form").serialize(),a=this;Craft.postActionRequest("sprout-module-forms/form-integrations/get-target-integration-fields",s,$.proxy(function(o,d){if(d==="success"&&o.success){const l=o.targetIntegrationFields;if(l.length===0)return!1;i.each(function(u){const g=$(this).find("select"),f=l[u];a.appendFieldsToSelect(g,f)})}else Craft.cp.displayError(Craft.t("sprout","Unable to get the Form fields"))},this))}getCurrentRows(e=null){return e===null&&(e="tbody .formField"),$(e)}appendFieldsToSelect(e,t){e.empty();let i="",s=!1;e.append('<option value="">'+Craft.t("sprout","None")+"</option>");for(let a=0;a<t.length;a++){const o=t[a];let d="";const r=a===t.length-1;"optgroup"in o||("selected"in o&&(d="selected"),i+="<option "+d+' value="'+o.value+'">'+o.label+"</option>"),("optgroup"in o&&s||r&&s)&&(i+="</optgroup>",s=!1),"optgroup"in o&&(i+='<optgroup label="'+o.optgroup+'">',s=!0)}e.append(i)}}window.SproutFormsIntegration=I;/*
 * @link https://sprout.barrelstrengthdesign.com
 * @copyright Copyright (c) Barrel Strength Design LLC
 * @license https://craftcms.github.io/license
 */typeof Craft.SproutForms>"u"&&(Craft.SproutForms={});(function(n){let e=window.MutationObserver||window.WebKitMutationObserver;e||(e=function(){},e.prototype.observe=function(){},e.prototype.disconnect=function(){}),Craft.SproutForms.IntegrationModal=Garnish.Modal.extend({$body:null,$content:null,$main:null,$footer:null,$leftButtons:null,$rightButtons:null,$saveBtn:null,$cancelBtn:null,$deleteBtn:null,$saveSpinner:null,$deleteSpinner:null,$loadSpinner:null,addedDelete:!1,$html:null,$js:null,$css:null,$currentHtml:null,$currentJs:null,$currentCss:null,$observed:null,observer:null,templateLoaded:!1,executedJs:null,loadedCss:null,init:function(t){this.base(),this.setSettings(t,{resizable:!0}),this.$currentHtml=n(),this.$currentJs=n(),this.$currentCss=n(),this.$observed=n(),this.executedJs={},this.loadedCss={},this.observer=new e(n.proxy(function(a){for(let o=0;o<a.length;o++)this.$observed=this.$observed.add(a[o].addedNodes)},this));const i=n('<form class="modal sprout-field-modal" style="display: none; opacity: 0;">').appendTo(Garnish.$bod);this.$body=n('<div class="body">').appendTo(i),this.$content=n('<div class="content">').appendTo(this.$body),this.$main=n('<div class="main">').appendTo(this.$content),this.$footer=n('<div class="footer">').appendTo(i),this.$loadSpinner=n('<div class="spinner big">').appendTo(i),this.$leftButtons=n('<div class="buttons left">').appendTo(this.$footer),this.$rightButtons=n('<div class="buttons right">').appendTo(this.$footer),this.$deleteSpinner=n('<div class="spinner hidden">').appendTo(this.$leftButtons),this.$deleteBtn=n('<div class="btn delete hidden" role="button">').text(Craft.t("sprout","Delete")).appendTo(this.$leftButtons),this.$cancelBtn=n('<div class="btn disabled" role="button">').text(Craft.t("sprout","Cancel")).appendTo(this.$rightButtons),this.$saveBtn=n('<div class="btn submit disabled" role="button">').text(Craft.t("sprout","Save")).appendTo(this.$rightButtons),this.$saveSpinner=n('<div class="spinner hidden">').appendTo(this.$rightButtons),this.setContainer(i),this.$loadSpinner.addClass("hidden");const s={html:"",js:"",css:""};this.initTemplate(s)},initTemplate:function(t){const i=n.proxy(function(s){this.$html=s.$html,this.$js=s.$js,this.$css=s.$css,this.templateLoaded=!0,this.initListeners(),this.visible&&this.initSettings(),this.off("parseTemplate",i)},this);this.on("parseTemplate",i),this.parseTemplate(t)},parseTemplate:function(t){const i=this,s=Garnish.$doc.find("head"),a=n(t.html),o=n(t.js).filter("script"),d=n(t.css).filter("style, link"),r=d.filter("link").prop("async",!0),l=d.filter("style");r.each(function(){const m=n(this),c=m.prop("href");i.loadedCss.hasOwnProperty(c)||(s.append(m),i.loadedCss[c]=m)});const u=o.filter("[src]"),g=o.filter(":not([src])"),f=[];u.each(function(){const c=n(this).prop("src");i.executedJs.hasOwnProperty(c)||(f.push(c),i.executedJs[c]=!0)});const p=function(){i.off("runExternalScripts",p),i.trigger("parseTemplate",{target:this,$html:a,$js:g,$css:l})};n.when(this.runExternalScripts(f)).then(p()),this.$deleteBtn.removeClass("hidden"),this.$saveBtn.removeClass("disabled"),this.$cancelBtn.removeClass("disabled")},runExternalScripts:function(t){let i=t.length;if(i>0)for(let s=0;s<t.length;s++){const a=t[s];(a.indexOf("MatrixConfigurator")>=0||a.indexOf("TableFieldSettings.min.js")>=0||a.indexOf("quill.min.js")>=0||a.indexOf("sproutfields.js")>=0||a.indexOf("EditableTable.js")>=0||a.indexOf("initialize.js")>=0)&&n.getScript(a,n.proxy(function(o,d){d==="success"?(i--,i===0&&this.trigger("runExternalScripts",{target:this})):Craft.cp.displayError(Craft.t("sprout","Could not load all resources."))},this))}else this.trigger("runExternalScripts",{target:this})},initListeners:function(){this.$deleteBtn.addClass("hidden"),this.$cancelBtn.addClass("disabled"),this.$saveBtn.addClass("disabled"),this.addListener(this.$cancelBtn,"activate","closeModal"),this.addListener(this.$saveBtn,"activate","saveIntegration"),this.addedDelete||(this.addListener(this.$deleteBtn,"click","deleteIntegration"),this.addedDelete=!0),this.on("show",this.initSettings),this.on("fadeOut",this.destroySettings),this.enable()},destroyListeners:function(){this.$cancelBtn.addClass("disabled"),this.$saveBtn.addClass("disabled"),this.removeListener(this.$cancelBtn,"activate"),this.removeListener(this.$saveBtn,"activate"),this.off("show",this.initSettings),this.off("fadeOut",this.destroySettings),this.disable()},initSettings:function(t){const i=t&&t.target?t.target:this;if(!i.templateLoaded)return;i.$currentHtml=t&&t.$html?t.$html:i.$html.clone(),i.$currentJs=t&&t.$js?t.$js:i.$js.clone(),i.$currentCss=t&&t.$css?t.$css:i.$css.clone(),i.$observed=n(),i.observer.observe(Garnish.$bod[0],{childList:!0,subtree:!1}),i.$main.append(i.$currentHtml),Garnish.$bod.append(i.$currentJs),Craft.initUiElements();const s=function(){i.off("runExternalScripts",s),setTimeout(function(){i.observer.disconnect()},1)};n.when(i.runExternalScripts(Object.keys(i.executedJs))).then(s())},destroySettings:function(t){const i=t&&t.target?t.target:this;i.$currentHtml.remove(),i.$currentJs.remove(),i.$currentCss.remove(),i.$observed.remove()},closeModal:function(){this.hide()},saveIntegration:function(t){if(t&&t.preventDefault(),this.$saveBtn.hasClass("disabled")||!this.$saveSpinner.hasClass("hidden"))return;this.destroyListeners(),this.$saveSpinner.removeClass("hidden");const i=this.$container.serialize(),s=this.$container.find('input[name="integrationId"]');s.length&&s.val(),Craft.postActionRequest("sprout-module-forms/form-integrations/save-integration",i,n.proxy(function(a,o){this.$saveSpinner.addClass("hidden");const d=o==="success";if(d&&a.success)this.initListeners(),this.trigger("saveIntegration",{target:this,integration:a.integration}),Craft.cp.displayNotice(Craft.t("sprout","'{name}' integration saved.",{name:a.integration.name})),this.hide();else if(d&&a.template)if(this.visible){const r=n.proxy(function(l){this.initListeners(),this.destroySettings(),this.initSettings(l),this.off("parseTemplate",r)},this);this.on("parseTemplate",r),this.parseTemplate(a.template),Garnish.shake(this.$container)}else this.initListeners();else this.initListeners(),Craft.cp.displayError(Craft.t("sprout","An unknown error occurred."))},this))},editIntegration:function(t){this.destroyListeners(),this.show(),this.initListeners(),this.$loadSpinner.removeClass("hidden");const i=n("#formId").val(),s={integrationId:t,formId:i};Craft.postActionRequest("sprout-module-forms/form-integrations/edit-integration",s,n.proxy(function(a,o){this.$loadSpinner.addClass("hidden");const d=o==="success";if(d&&a.success){const r=n.proxy(function(l){this.destroySettings(),this.initSettings(l),this.off("parseTemplate",r)},this);this.on("parseTemplate",r),this.parseTemplate(a.template)}else d&&a.error?(Craft.cp.displayError(a.error),this.hide()):(Craft.cp.displayError(Craft.t("sprout","An unknown error occurred. ")),this.hide())},this))},deleteIntegration:function(t){if(t.preventDefault(),this.confirmDeleteIntegration()){this.destroyListeners();const s=this.$container.serialize(),a=n(this.$container).find('input[name="integrationId"]').val();Craft.postActionRequest("sprout-module-forms",s,n.proxy(function(o,d){d==="success"&&o.success?(Craft.cp.displayNotice(Craft.t("sprout","Integration deleted.")),n("#sproutforms-integration-row-"+a).remove(),this.initListeners(),this.hide()):(Craft.cp.displayError(Craft.t("sprout","Unable to delete integration.")),this.hide())},this))}},confirmDeleteIntegration:function(){return confirm("Are you sure you want to delete this integration and all of it's settings?")},hide:function(){this._disabled||this.base()},destroy:function(){this.base.destroy(),this.destroyListeners(),this.destroySettings(),this.$shade.remove(),this.$container.remove(),this.trigger("destroy")}},{getInstance:function(){return this._instance||(this._instance=new Craft.SproutForms.IntegrationModal),this._instance}})})(jQuery);class U{constructor(e){this.elementId=e,this.initElementSlideout()}initElementSlideout(){let e=this;document.getElementById("new-data-set").addEventListener("change",function(i){Craft.sendActionRequest("POST","sprout-module-data-studio/data-set/create-data-set",{data:{type:i.target.value}}).then(s=>{s.data.success&&Craft.createElementEditor("BarrelStrength\\Sprout\\datastudio\\components\\elements\\DataSetElement",{elementId:s.data.elementId,siteId:s.data.siteId,draftId:s.data.draftId,elementType:"BarrelStrength\\Sprout\\datastudio\\components\\elements\\DataSetElement"}).on("submit",()=>{e.replaceTable()})})})}replaceTable(){let e=this;Craft.sendActionRequest("POST","sprout-module-forms/forms/get-data-source-relations-table",{data:{elementId:e.elementId}}).then(t=>{$("#data-source-relations-field").html(t.data.html),e.initElementSlideout()})}}window.DataSourceRelationsTable=U;
//# sourceMappingURL=forms-b732240c.js.map