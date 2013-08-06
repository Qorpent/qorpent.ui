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
                <th>Группа</th>
              </tr>
            </thead>
            <tbody>
              <xsl:apply-templates select="item[generate-id(.)=generate-id(key('ServiceType',@ServiceType))]" mode="OutputServices"/>
            </tbody>
          </table>
          <xsl:apply-templates select="item" mode="OutputSecondHeadTable"/>
        </body>
      </html>
    </xsl:template>
  
  
  <xsl:template match="item" mode="OutputServices">
    <tr>
      <td>
        <xsl:value-of select="@ServiceType"/>
      </td>
    </tr>
    <!--<ul>
     <xsl:apply-templates mode="next" select="key('ServiceType',@ServiceType)">      </xsl:apply-templates>
    </ul>-->
  </xsl:template>

  
  
    
   
  
  

  <xsl:template match="item" mode="next">
    <tr>
      <th>
        <xsl:value-of select="@Id"/>
      </th>
    </tr>
  </xsl:template>
  
  

  <xsl:template match="item" mode="OutputSecondHeadTable">
    <table class="data">
      <thead>
        <tr>
          <th>
            <xsl:value-of select="@ServiceType"/>
          </th>
        </tr>
      </thead>
      <tbody>
        <xsl:apply-templates mode="next" select="key('ServiceType',@ServiceType)">      </xsl:apply-templates>
      </tbody>
    </table>
   
    
    <!--<ul>
     <xsl:apply-templates mode="next" select="key('ServiceType',@ServiceType)">      </xsl:apply-templates>
    </ul>-->
  </xsl:template>

  <xsl:template match="item" mode="OutputServicesMore">
    
   
     <xsl:apply-templates mode="next" select="key('ServiceType',@ServiceType)">      </xsl:apply-templates>
   
  </xsl:template>






</xsl:stylesheet>

