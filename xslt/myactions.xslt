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
        <h1>My Action</h1>
        <h2>
          <a name ="up">
            Расположение <xsl:value-of select="name(/root)"/>/<xsl:value-of select="name(/root/item)"/>
          </a>
        </h2>
        <table class="data">
          <thead>
            <tr>
              <!--<th>Расположение элемента</th>-->
              <!--<th>Атрибут</th>-->
              <!--<th>Значение атрибута <xsl:value-of select="name(root/item/@key)"/></th>-->
              <th>Группа</th>
            </tr>
          </thead>
          <tbody>
            <xsl:apply-templates select="/root/item"/>
          </tbody>
        </table>
        <!--==========================================-->
        <xsl:apply-templates select="/root/item" mode="OutputKeyFrom.Root.Key.Key"/>
        <!-- =====================Вывод параметров=====================-->
        <!-- <p style  ="font-family:verdana;color:brown">
          Параметры
        </p>
        <xsl:apply-templates select="//parameters/item" mode="ValParam"/>-->
        <!--==========================================-->
      </body>
    </html>
  </xsl:template>
  <!-- ==========================================
    Тимплейт, выводящий  тело основной заголовочной таблицы
  ==========================================-->
  <xsl:template match="/root/item">
    <tr>
      <td>
        <!--<xsl:value-of select="@key"/>-->
        <xsl:choose>
          <xsl:when test=".">
            <a href="#group-{@key}">
              <xsl:value-of select="@key"/>
            </a>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="@key"/>
          </xsl:otherwise>
        </xsl:choose>
      </td>
    </tr>
  </xsl:template>
  <!-- ==========================================
    Тимплейт, выводящий заголовок второй
  ==========================================-->
  <!--==========================================-->
  <xsl:template match="/root/item" mode="OutputKeyFrom.Root.Key.Key">
    <h2>
      <a name="group-{@key}">
        Группа <xsl:value-of select="@key"/>
      </a>
    </h2>
    <h4>
      Расположение в XML:  <xsl:value-of select=" name(/root)"/>/<xsl:value-of select="name(/root/item)"/>/<xsl:value-of select="name(/root/item/item)"/>
    </h4>
    <!--<a name="attr-detail-{@Name}"/> Атрибут <xsl:value-of select="@Name"/>-->
    <table class="data">
      <thead>
        <tr>
          <!--<th>Расположение элемента</th>-->
          <th>
            <!-- Значение атрибута <xsl:value-of select="name(@key)"/>-->
            Команда
          </th>
          <th>Help</th>
          <th>Arm</th>
          <th>Форма вызова для действия:</th> 
        </tr>
      </thead>
      <tbody>
        <xsl:apply-templates select="item" mode="valTbody"/>
        <!-- -->
      </tbody>
    </table>
    <xsl:apply-templates select="item" mode="valTableHead2"/>
  </xsl:template>
  <!-- ==========================================
    Тимплейт, выводящий выводящий атрибуты key в root/item/item/@key=
  ==========================================-->
  <xsl:template match="//item/item"  mode="valTbody">
    <tr>
      <!--
      <th>
        /key=  <xsl:value-of select="../@key"/>
      </th>-->
      <td>
        <!-- <xsl:value-of select="@key"/>-->
        <xsl:choose>
          <xsl:when test=".">
            <a href="#podgroup-{@key}">
              <xsl:value-of select="@key"/>
            </a>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="@key"/>
          </xsl:otherwise>
        </xsl:choose>
      </td>
      <td>
        <xsl:value-of select="value/@Help"/>
      </td>
      <td>
        <xsl:value-of select="value/@Arm"/>
      </td>
  <td>
    <a href="./myactions.qweb/_sys/{@key}.form.qweb">Перейти на <xsl:value-of select="@key"/></a>
   <!--<a href="./myactions.qweb"><xsl:value-of select="@Key"/>dsf</a>-->
      </td>  
  </tr>
  </xsl:template>
  <!--==========================================
   Тимплейт, выводящий таблицы с заголовком /root/item/item/@key
  ==========================================-->
  <xsl:template match="//item/item"  mode="valTableHead2">
    <h3>
      <a name ="podgroup-{@key}">
        Подгруппа  <xsl:value-of select="@key"/>
      </a>
    </h3>
    <h4>
      Расположение в XML:
      <xsl:value-of select=" name(/root)"/>/<xsl:value-of select="name(/root/item)"/>/<xsl:value-of select="name(/root/item/item)"/>/<xsl:value-of select="name(/root/item/item/value)"/>/<xsl:value-of select="name(/root/item/item/value/parameters)"/>/<xsl:value-of select="name(/root/item/item/value/parameters/item)"/>/
    </h4>
    <h5>
      <xsl:value-of select="name(value/@Help)"/> - "<xsl:value-of select="value/@Help"/>"
      <xsl:value-of select="  name(value/@Arm)"/> - "<xsl:value-of select="value/@Arm"/>"
    </h5>
   <!-- 
          <xsl:value-of select="@Comment" disable-output-escaping="yes"/>
      </xsl:if> 
    <xsl:if test="/shop/user_id/node()"> узел существует </xsl:if>-->
    <xsl:choose>
      <xsl:when test="value/parameters/item">
      
      <table class="data">
      <thead>
        <tr>
          <!--<th>Расположение элемента</th>-->
          <th>
            <xsl:value-of select ="name(value/parameters/item/@Help)"/>
          </th>
          <th>
            <xsl:value-of select ="name(value/parameters/item/@Name)"/>
          </th>
          <th>
            <xsl:value-of select ="name(value/parameters/item/@Required)"/>
          </th>
          <th>
            <xsl:value-of select ="name(value/parameters/item/@ValidatePattern)"/>
          </th>
          <th>
            <xsl:value-of select ="name(value/parameters/item/@IsLargeText)"/>
          </th>
          <th>
            <xsl:value-of select ="name(value/parameters/item/@IsComplexString)"/>
          </th>
          <th>
            <xsl:value-of select ="name(value/parameters/item/@IsColor)"/>
          </th>
          <th>
            <xsl:value-of select ="name(value/parameters/item/@RequireValidation)"/>
          </th>
          <th>
            <xsl:value-of select ="name(value/parameters/item/@LowerCase)"/>
          </th>
          <th>
            <xsl:value-of select ="name(value/parameters/item/@UpperCase)"/>
          </th>
          <th>
            <xsl:value-of select ="name(value/parameters/item/@TypeName)"/>
          </th>
          <th>
            <xsl:value-of select ="name(value/parameters/item/@ErrorMessage)"/>
          </th>
          <th>
            <xsl:value-of select ="name(value/parameters/item/@__idx)"/>
          </th>
        </tr>
      </thead>
      <tbody>
        <xsl:apply-templates select="value/parameters" mode="ValParamTBody"/>
        <!-- -->
      </tbody>
    </table>
 </xsl:when>
    <xsl:otherwise><a>Параметры отсутсвуют</a>
    </xsl:otherwise></xsl:choose>
      
    <div>
      <a href="#up">назад к оглавлению</a>
    </div>

  </xsl:template>


  <!--=================Заголовок таблицы с параметрами=========================-->


  <!--=================Тело таблицы с параметрами=========================-->
  <xsl:template match="parameters/item" mode="ValParamTBody">
    <tr>
      <td>
        <xsl:value-of select=" @Help"/>
      </td>
      <td>
        <xsl:value-of select ="@Name"/>
      </td>
      <td>
        <xsl:value-of select ="@Required"/>
      </td>
      <td>
        <xsl:value-of select ="@ValidatePattern"/>
      </td>
      <td>
        <xsl:value-of select ="@IsLargeText"/>
      </td>
      <td>
        <xsl:value-of select ="@IsComplexString"/>
      </td>
      <td>
        <xsl:value-of select ="@IsColor"/>
      </td>
      <td>
        <xsl:value-of select ="@RequireValidation"/>
      </td>
      <td>
        <xsl:value-of select ="@LowerCase"/>
      </td>
      <td>
        <xsl:value-of select ="@UpperCase"/>
      </td>
      <td>
        <xsl:value-of select ="@TypeName"/>
      </td>
      <td>
        <xsl:value-of select ="@ErrorMessage"/>
      </td>
      <td>
        <xsl:value-of select ="@__idx"/>
      </td>
    </tr>
  </xsl:template>
</xsl:stylesheet>






