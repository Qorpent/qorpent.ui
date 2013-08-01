<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
  <xsl:template match="/">
    <html>
      <head>
        <title>MyAction</title>
        <link rel="stylesheet" href="../styles/zdev.base.css" />
      </head>
      <body>
        <header>
          <h1>Форма вызова для действия: _sys.myactions.action</h1>
        </header>
        <xsl:apply-templates select="root" mode="main"/>

      </body>
    </html>
  </xsl:template>
  <xsl:template match="root" mode="main">
    <table class="data">
      <thead>
        <tr>
          <th>
            Группа </th>
          <td>
              <xsl:value-of select="item/@key"/>
            </td>          
          </tr>
        <tr>
          <th>
            Команда
          </th>
          <td>
            <xsl:value-of select="item/item/@key"/>
          </td>
        </tr>
        <xsl:if test="item/item/value/@Help!=''">
        <tr>
          <th>
            <xsl:value-of select="name(item/item/value/@Help)"/>
          </th>
          <td>
            <xsl:value-of select="item/item/value/@Help"/>
          </td>
        </tr>
        </xsl:if>
        <tr>
          <th>
            <xsl:value-of select="name(item/item/value/@Arm)"/>
          </th>
          <td>
            <xsl:value-of select="item/item/value/@Arm"/>
          </td>
        </tr>
        <tr>
          <th colspan="2">Параметры</th>
        </tr> 
         <tr>
          <th>
            <xsl:value-of select="name(item/item/value/parameters/item/@Name)"/>
          </th>
          <td>
            <xsl:value-of select="item/item/value/parameters/item/@Name"/>
          </td>
        </tr>
        <xsl:if test="item/item/value/parameters/item/@Required">
          <tr>
            <th>
              <xsl:value-of select="name(item/item/value/parameters/item/@Required)"/>
            </th>

            <td>
              <xsl:choose>
                <xsl:when test='item/item/value/parameters/item/@Required="true"'>
                  <input name ="Required" type="radio"  checked="checked" disabled="disabled" />
                </xsl:when>
                <xsl:otherwise>
                  <input name ="Required" type="radio"   disabled="disabled" />
                </xsl:otherwise>
              </xsl:choose>
            </td>

          </tr>
        </xsl:if>
        <xsl:if test="item/item/value/parameters/item/@RequireValidation">
        <tr>
          <th>
            <xsl:value-of select="name(item/item/value/parameters/item/@RequireValidation)"/>
          </th>
          <td>
            <xsl:choose>
              <xsl:when test='item/item/value/parameters/item/@RequireValidation="true"'>
                <input name ="RequireValidation" type="radio"  checked="checked" disabled="disabled" />
              </xsl:when>
              <xsl:otherwise>
                <input name ="RequireValidation" type="radio"   disabled="disabled" />
              </xsl:otherwise>
            </xsl:choose>
          </td>
        </tr>
        </xsl:if>
        <tr>
          <th>
            <xsl:value-of select="name(item/item/value/parameters/item/@TypeName)"/>
          </th>
          <td>
            <xsl:value-of select="item/item/value/parameters/item/@TypeName"/>
          </td>
        </tr>
        <tr>
          <th>
            <xsl:value-of select="name(item/item/value/parameters/item/@DataType)"/>
          </th>
          <td>
            <xsl:value-of select="item/item/value/parameters/item/@DataType"/>
          </td>
        </tr>
        <tr>
          <th>
            <xsl:value-of select="name(item/item/value/parameters/item/@ErrorMessage)"/>
          </th>
          <td>
            <xsl:value-of select="item/item/value/parameters/item/@ErrorMessage"/>
          </td>
        </tr>
        <tr>
          <th>
            <xsl:value-of select="name(item/item/value/parameters/item/@__idx)"/>
          </th>
          <td>
            <xsl:value-of select="item/item/value/parameters/item/@__idx"/>
          </td>
        </tr>
        
      
      </thead>
    </table>
  </xsl:template>


</xsl:stylesheet>






