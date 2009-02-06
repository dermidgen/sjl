<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="classes">
	<h2 style="margin-top:0px">Packages</h2>
  	<xsl:for-each select="class">
  		<xsl:sort select="@name"/>
	    <xsl:if test="inner-classes/class">
		    <div>
		    <h3 class="PackageName" style="white-space:nowrap;">
		    	<img src="resource/image/package18.gif"/>

		    	<xsl:choose>
		    		<xsl:when test="constructor_vars/var">
		    			<span>
		    				<xsl:attribute name="onclick">
		    					<xsl:text>app.UpdateClassInfo('</xsl:text>
								<xsl:value-of select="@name"/>
								<xsl:text>')</xsl:text>
		    				</xsl:attribute>
		    				<xsl:attribute name="style">cursor:pointer</xsl:attribute>
		    				<xsl:value-of select="@name"/>
		    			</span>
		    		</xsl:when>
		    		<xsl:otherwise>
		    			<xsl:value-of select="@name"/>
		    		</xsl:otherwise>
		    	</xsl:choose>

		    </h3>
		    	<xsl:for-each select="inner-classes/class">
		    		<xsl:sort select="@name"/>
		    		<div>
					<xsl:attribute name="onclick">
						<xsl:text>app.UpdateClassInfo('</xsl:text>
						<xsl:value-of select="@name"/>
						<xsl:text>')</xsl:text>
					</xsl:attribute>
					<xsl:attribute name="class">PackageClass</xsl:attribute>
					<xsl:attribute name="style">white-space: nowrap;</xsl:attribute>
						<img src="resource/image/class18.gif"/><xsl:value-of select="@name"/>
					</div>
				</xsl:for-each>
		    </div>
		</xsl:if>
	</xsl:for-each>
  </xsl:template>

  <xsl:template match="/">
  	<xsl:apply-templates/>
  </xsl:template>

</xsl:stylesheet>
