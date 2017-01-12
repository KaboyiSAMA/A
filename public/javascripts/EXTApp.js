/**
 * Created by Kaboyi on 2016/12/22.
 */
var cStore=new Ext.data.SimpleStore({
    fields:['id','name'],
    data:[[1,1],[3,4],[5,5]]
})
var cb=new Ext.form.ComboBox({
    fieldLable:'K',
    store:cStore,
    displayField:'name',
    valueField:'id',
    triggerAction:'all',
    emptyText:'请选择...',
    allowBlank:false,
    blankText:'请选择K',
    editable:false,
    model:'local'
});
cb.on('select',function () {
    console.log(arguments)
})
var form = new Ext.form.FormPanel({
    frame:true,
    title:'表单K',
    style:'margin:10px',
    html:'<div style="padding:10px">这里表单内容</div>',
    items:[cb],
})
var win = new Ext.Window({
    title:'窗口',
    width:400,
    height:350,
    html:'<div>这里是窗体内容</div>',
    resizable:true,
    // modal:true,
    closable:true,
    maximizable:true,
    minimizable:true,
    buttonAlign:'center',
    items:form
})
win.show()