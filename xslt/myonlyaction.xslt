<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
  <xsl:template match="/root">
    <html>
      <head>
        <link rel='stylesheet' href='../styles/sys.base.css' />
        <script>
          var actionform = {
          submit: function (target) {
          target.setAttribute("action", target.getAttribute("action").replace(/\w+\.qweb/, document.querySelector('#formrender').value + ".qweb"));
          if (target.checkValidity()) {
          target.submit();
          }
          }
          }
        </script>
     <script type="text/javascript">
function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function replaceSelection (input, replaceString) {
	if (input.setSelectionRange) {
		var selectionStart = input.selectionStart;
		var selectionEnd = input.selectionEnd;
		input.value = input.value.substring(0, selectionStart)+ replaceString + input.value.substring(selectionEnd);
    
		if (selectionStart != selectionEnd){ 
			setSelectionRange(input, selectionStart, selectionStart + 	replaceString.length);
		}else{
			setSelectionRange(input, selectionStart + replaceString.length, selectionStart + replaceString.length);
		}

	}else if (document.selection) {
		var range = document.selection.createRange();

		if (range.parentElement() == input) {
			var isCollapsed = range.text == '';
			range.text = replaceString;

			 if (!isCollapsed)  {
				range.moveStart('character', -replaceString.length);
				range.select();
			}
		}
	}
}


// We are going to catch the TAB key so that we can use it, Hooray!
function catchTab(item,e){
	if(navigator.userAgent.match("Gecko")){
		c=e.which;
	}else{
		c=e.keyCode;
	}
	if(c==9){
		replaceSelection(item,String.fromCharCode(9));
		setTimeout("document.getElementById('"+item.id+"').focus();",0);	
		return false;
	}
		    
}
</script>
        <body>


</body>
          
      </head>
      <body>
        <header>
          <h1>
            Форма вызова для действия: <xsl:value-of select=" item/@key"/>.<xsl:value-of select="item/item/@key"/>.action
          </h1>
        </header>
        <section>
          <xsl:if test="item/item/value/@Help!=''">
            <h2>Описание</h2>
            <p>
              <xsl:value-of select="item/item/value/@Help"/>
            </p>
          </xsl:if>
          <xsl:apply-templates select="//value/parameters" mode="farmcall"/>
         
        </section>      
      </body>
    </html>
  </xsl:template>
  <xsl:template match="//value/parameters" mode="farmcall">
    <form id="formcall" method="POST" target="formresult" action="../{../../../@key}/{../../@key}.RENDER.qweb" actionname="{../../../@key}.{../../@key}.action">
      <table>
      <tbody>
        <tr>
          <td id="tableforposition">
            <table class="data">
              <tbody>
                <xsl:apply-templates select="item" mode="tbstring"/>
              </tbody>
            </table>
          </td>
          <td>
            <select id="formrender">
              <option value="bxl">BXL</option>
              <option value="embedjs">EMBEDJS</option>
              <option value="embedjson">EMBEDJSON</option>
              <option value="empty">EMPTY</option>
              <option value="file">FILE</option>
              <option value="filedesc">FILEDESC</option>
              <option value="form">FORM</option>
              <option value="html">HTML</option>
              <option value="js">JS</option>
              <option value="json">JSON</option>
              <option value="md5">MD5</option>
              <option value="qview">QVIEW</option>
              <option value="string">STRING</option>
              <option value="view">VIEW</option>
              <option value="wiki">WIKI</option>
              <option value="xml">XML</option>
            </select>
            <input type="button" onclick="actionform.submit(document.querySelector('#formcall'))" value="Выполнить →"/>
            <iframe id="formresult" name="formresult"/>
          </td>
        </tr>
      </tbody>
      </table>
      </form>
  </xsl:template>
  
  
  <xsl:template match ="item" mode ="tbstring">
    <xsl:choose>
            <xsl:when test="@DataType='String' and not(@IsLargeText)">
              <tr>
                <th>
                  <xsl:value-of select="@Name"/>
                </th>
                <td>
                  <xsl:choose>
            
              <xsl:when test="@Required='true'">
              <input size="50" value="" required='true' name="{@Name}"/>              
            </xsl:when>
              
                <xsl:when test="@ValidatePattern!=''">
                <input size="50" value="" pattern='{@ValidatePattern}' name="{@Name}"/>
              </xsl:when>
                
                  <xsl:when test="@ValidatePattern!='' and @Required='true'  ">
              <input size="50" value="" required='true' pattern='{@ValidatePattern}' name="{@Name}"/>              
            </xsl:when>
               
                 <xsl:when test="@ValidatePattern!=''">
              <input size="50" value="" patern='{@ValidatePattern}' name="{@Name}"/> 
            </xsl:when>
              
                <xsl:otherwise>
                 <input size="50" value="" name="{@Name}"/>
              </xsl:otherwise>
            </xsl:choose>
          </td>
              <!--  <td rowspan="{count(//parameters/item)}">Item 1</td>-->
        </tr>
      </xsl:when>
      <xsl:when test="@DataType='Boolean'">
        <tr>
          <th>
            <xsl:value-of select="@Name"/>
          </th>
          <td>
            <input type="checkbox" size="50" value="true" name="{@Name}"/>
          </td>          
        </tr>
      </xsl:when>
      <xsl:when test='@IsLargeText="true"'>
        <tr>
          <th>
            <xsl:value-of select="@Name"/>
          </th>          
            <td>
              <textarea id="data" onkeydown="return catchTab(this,event)" value="" name="{@Name}" style="width: 563px; height: 185px;"></textarea>
             
            </td>          
        </tr>
      </xsl:when>
    </xsl:choose>
   <!---->
    </xsl:template>
  

</xsl:stylesheet>






