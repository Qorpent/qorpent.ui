<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">

  <xsl:key name="ServiceType" match="item" use="@ServiceType"/>  
  
  <xsl:template match="root/*">
      <html>
        <head>
          <title>Container</title>
          <link rel="stylesheet" href="../styles/zdev.base.css" />
        </head>
        <body>
          <h1>Container</h1>
          <table class="data">
            <thead>
              <tr>
                <th>Сервис</th>
                <th>Пространство имен(service ns)</th>
                <th>NameSpace(ImpNS)</th>
              </tr>
            </thead>
            <tbody>
              <xsl:apply-templates select="item[generate-id(.)=generate-id(key('ServiceType',@ServiceType))]" 
                                   mode="OutputServices"/>
            </tbody>
          </table>
          <xsl:apply-templates select="item" mode="OutputSecondHeadTable"/>
        </body>
      </html>
    </xsl:template>
  
  
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
        <xsl:value-of select="@ImplNs"/>
      </td>
    </tr>
    <!--<ul>
     <xsl:apply-templates mode="next" select="key('ServiceType',@ServiceType)">      </xsl:apply-templates>
    </ul>-->
  </xsl:template>

  
  
    
   
  
  

  <xsl:template match="item" mode="next">
    <tr>
      <td>
        <xsl:value-of select="@Id"/>
      </td>
      <td>
        <xsl:value-of select="@ServiceNs"/>
      </td>
      <td>
        <xsl:value-of select="@ImplNs"/>
      </td>
      
    </tr>
  </xsl:template>
  
  

  <xsl:template match="item" mode="OutputSecondHeadTable">
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
            <xsl:value-of select="name(@ServiceNs)"/>
          </th>
          <th>
            <xsl:value-of select="name(@ImplNs)"/>
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

