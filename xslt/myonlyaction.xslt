<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
  <xsl:template match="/root">
    <html>
      <head>
        <link rel='stylesheet' href='../styles/zdev.base.css' />
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
        <!--
        <section>
          <h2>Описание</h2>
          <p>Позволяет получить список доступных операций</p>
          <form id="formcall" actionname="_sys.myactions.action" action="./myactions.qweb/{root/item/@key}/{root/item/item/@key}.xml.qweb" target="formresult" method="POST">
            <table>
              <tr>
                <td>Usage</td>
                <td>
                  <input name="Usage" value="" size="50" />
                </td>
                <td />
              </tr>
              <tr>
                <td>Command</td>
                <td>
                  <input name="Command" value="" size="50" />
                </td>
                <td />
              </tr>
            </table>
          </form>
          <input type="button" value="Выполнить  →" onclick="actionform.submit(document.querySelector('#formcall'))" />
          <section>
            <iframe id="formresult" name="formresult" />
          </section>
        </section>-->
      </body>
    </html>
  </xsl:template>

  <xsl:template match="//value/parameters" mode="farmcall">
    <form id="formcall" method="POST" target="formresult" actionname="{../../../@key}.{../../@key}.action">
      <table class="data">
        <tbody>
          <xsl:apply-templates select="item" mode="tbstring"/>
        </tbody>
      </table>
    </form>
  </xsl:template>
  <xsl:template match ="item" mode ="tbstring">
    <tr>
      <th><xsl:value-of select="@Name"/>
      </th>
      <td>Знач</td>
    </tr>
    <tr>
      <th>
        <xsl:value-of select="@DataType"/>
      </th>
      <td>Знач</td>
    </tr>
  </xsl:template>

</xsl:stylesheet>






