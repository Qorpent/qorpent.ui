<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">

  <xsl:key name="attrByVal" match="root/result/*/@*" use="local-name()"/>  
 <xsl:key name="ServiceType" match="item" use="@ServiceType"/>  
  <xsl:template match="root/*">
      <html>
        <head>
          <title>Container</title>
          <link rel="stylesheet" href="../styles/sys.base.css" />
        </head>
        <body>
          <h1>Container</h1>
          <table class="data">
            <thead>
              <tr>
                <th>Сервис</th>
                <th>Пространство имен(service ns)</th>
                <th>ServiceAssembly</th>
              </tr>
            </thead> 
            <tbody>
              <xsl:apply-templates select="item[generate-id(.)=generate-id(key('ServiceType',@ServiceType))]" 
                                   mode="OutputServices"/>
            </tbody>
          </table>
          Список атрибутов
           <table class="data"> 
            <tbody>
              <tr>
              <xsl:apply-templates select="*/@*"/>
            </tr></tbody>
          </table>
                 
         <!--
         -->      
          <!--<xsl:apply-templates      select="@*[generate-id(.)=generate-id(key('atr',name(@*)))]" mode="AllAtr"/> -->
        <xsl:apply-templates select="item" mode="OutputSecondHeadTable"/>
         
        </body>
      </html>
    </xsl:template>
  
  <!--
    <xsl:template match="/">
        <xsl:apply-templates select="/*/@*"/>
    </xsl:template>
    <xsl:template match="@*[generate-id()=generate-id(key('attrByVal', .)[1])]">
        <xsl:value-of select="concat(name(), ': ', ., '&#xA;')"/>
    </xsl:template>
    <xsl:template match="@*"/>
</xsl:stylesheet>-->
 
  
   <xsl:template match="@*[generate-id()=generate-id(key('attrByVal', local-name())[1])]">
      <td>
        <xsl:value-of select="name()"/>   
      </td>
  </xsl:template>  
  
 <xsl:template match="@*"/> 
  
            
 
  
  
  <xsl:template match="item" mode="OutputServices">
    <tr>
      <td>
        <xsl:choose>
          <xsl:when test=".">
            <a href="#command-{@ServiceType}">
              <xsl:value-of select="@ServiceType"/>
            </a>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="@ServiceType"/>
          </xsl:otherwise>
        </xsl:choose>
      </td>
      <td>
        <xsl:value-of select="@ServiceNs"/>
      </td>
      <td>
        <xsl:value-of select="@ServiceAssembly"/>
      </td>
    </tr>
    <!--<ul>
     <xsl:apply-templates mode="next" select="key('ServiceType',@ServiceType)">      </xsl:apply-templates>
    </ul>-->
  </xsl:template>

  <xsl:template match="item" mode="next">
    <tr>
          <td>
            <xsl:value-of select="(@Id)"/>
          </td>
           <td>
            <xsl:value-of select="(@Priority)"/>
          </td>
           <td>
            <xsl:value-of select="(@Lifestyle)"/>
          </td>
           <td>
            <xsl:value-of select="(@ImplType)"/>
          </td>
            <td>
            <xsl:value-of select="(@ImplNs)"/>
          </td> 
            <td>
            <xsl:value-of select="(@ImplAssembly)"/>
          </td>
            <td>
            <xsl:value-of select="(@__idx)"/>
          </td>
      <xsl:if test="@Name"><td>
            <xsl:value-of select="(@Name)"/>
          </td> 
     </xsl:if>
       <xsl:if test="@CreationCount"><td>
            <xsl:value-of select="(@CreationCount)"/>
          </td> 
     </xsl:if>
      
      <xsl:if test="@ActivationCount"><td>
            <xsl:value-of select="(@ActivationCount)"/>
          </td> 
     </xsl:if>
      
      
  
            <td>
            <xsl:value-of select="(@Line)"/>
          </td> <td>
            <xsl:value-of select="(@FileName)"/>
          </td> 
      
    </tr>
  </xsl:template>
  
  <xsl:template match="item[generate-id(.)=generate-id(key('ServiceType',@ServiceType))]" mode="OutputSecondHeadTable">
    <table class="data">
      <h2>
        <a name="command-{@ServiceType}">         
      Сервис <xsl:value-of select="@ServiceType"/>
        </a>
      </h2>
      <thead>
        <tr>
          <th>
            <xsl:value-of select="name(@Id)"/>
          </th>
          
           <th>
            <xsl:value-of select="name(@Priority)"/>
          </th>
          
           <th>
            <xsl:value-of select="name(@Lifestyle)"/>
          </th>
             <th>
            <xsl:value-of select="name(@ImplType)"/>
          </th> <th>
            <xsl:value-of select="name(@ImplNs)"/>
          </th> <th>
            <xsl:value-of select="name(@ImplAssembly)"/>
          </th> <th>
            <xsl:value-of select="name(@__idx)"/>
          </th> 
          <xsl:if test="@Name">
            <th>
            <xsl:value-of select="name(@Name)"/>
          </th> </xsl:if>
          <xsl:if test="@CreationCount">
           <th>
            <xsl:value-of select="name(@CreationCount)"/>     
          </th> 
          </xsl:if>
            <xsl:if test="@ActivationCount">
            <th>
            <xsl:value-of select="name(@ActivationCount)"/>     
          </th> 
          </xsl:if>
            <th>
            <xsl:value-of select="name(@Line)"/>
          </th> 
            <th>
            <xsl:value-of select="name(@FileName)"/>
          </th> 
      
            
          
       
        </tr>
      </thead>
      <tbody>
        <xsl:apply-templates mode="next" select="key('ServiceType',@ServiceType)">      
          
        </xsl:apply-templates>
      </tbody>
    </table>
   
    
    <!--<ul>
     <xsl:apply-templates mode="next" select="key('ServiceType',@ServiceType)">      </xsl:apply-templates>
    </ul>-->
  </xsl:template>

  <xsl:template match="item" mode="OutputServicesMore">   
     <xsl:apply-templates mode="next" 
                          select="key('ServiceType',@ServiceType)">            
     </xsl:apply-templates>
  </xsl:template>






</xsl:stylesheet>

