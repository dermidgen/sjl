<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="classes">
    <div>
    <h2>All Classes</h2>

      <xsl:for-each select="class">
      	<xsl:sort select="@name"/>

		<xsl:if test="instance-fields/field or instance-methods/method or class-fields/field or class-methods/method">

	      	<div class="PackageClass">
				<xsl:attribute name="onclick">
	          		<xsl:text>app.UpdateClassInfo('</xsl:text>
	          		<xsl:value-of select="@name"/>
	          		<xsl:text>')</xsl:text>
	          	</xsl:attribute>
	          	<xsl:attribute name="style">white-space: nowrap;</xsl:attribute>
	          	<img src="resource/image/class18.gif" /><xsl:value-of select="@name"/>
	        </div>

        </xsl:if>

      </xsl:for-each>

    </div>
  </xsl:template>

  <xsl:template match="/">
  	<xsl:apply-templates/>
  </xsl:template>

</xsl:stylesheet>
