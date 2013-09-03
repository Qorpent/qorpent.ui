<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/root/result">
    <html>
      <head>
        <title>List of files and folders of the current folder</title>
        <link rel='stylesheet' href='../styles/sys.base.css' />
      </head>
      <body>
        <h1>Список файлов и папок текущей дирректории</h1>
        <table class="data">
          <thead>
            <tr>
              <th>ID</th>
              <th>Относительный путь</th>
              <th>Тип</th>
            </tr>
          </thead>
          <tbody>
            <xsl:apply-templates select="item" mode="item"/>
          </tbody>
        </table>       
      </body>
    </html>
    
  </xsl:template>
  <xsl:template match="item" mode="item">
    <tr>
      <td>
        <xsl:value-of select="@__idx"/>
      </td>
      <td>
        <xsl:value-of select="@LocalPath"/>
      </td>
      <td>
        <xsl:value-of select="@Type"/>
      </td>
    </tr>
  </xsl:template>
</xsl:stylesheet>
