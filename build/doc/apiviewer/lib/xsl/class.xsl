<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html"/>

  <xsl:template match="classes/class">

		<xsl:variable name="classname">
			<xsl:value-of select="@name"/>
		</xsl:variable>
		<xsl:variable name="filename">
			<xsl:value-of select=".//var[@name='filename']"/>
		</xsl:variable>
		<xsl:variable name="description">
			<xsl:copy-of select=".//var[@name='class']/value/p"/>
		</xsl:variable>

	    <div style="margin-top:10px">
	    <h2 class="class">Class <span class="ClassName"><xsl:value-of select="$classname"/></span></h2>

		<div class="ClassSummary">
	    <xsl:copy-of select="$description"/>

	    <xsl:if test=".//var[@name='author']/value/p">
	    <b>Author:</b> <xsl:value-of select=".//var[@name='author']"/><br/>
	    </xsl:if>

	    <i>Defined in: <xsl:value-of select="$filename"/></i>

		<xsl:if test="@extends">
			<div class="ConstructorSummary">
	    		<b>Extends:</b>
	    		<xsl:for-each select=".//var[@name='base']">
	    			<xsl:variable name="classExtend">
	    				<xsl:value-of select="normalize-space(value/p/text())"/>
	    			</xsl:variable>
	    			<xsl:choose>
	    				<xsl:when test="//class[@name=$classExtend]">
	    					<pre>
			    				<xsl:attribute name="onclick">
			    					<xsl:text>app.UpdateClassInfo('</xsl:text>
									<xsl:value-of select="$classExtend"/>
									<xsl:text>')</xsl:text>
			    				</xsl:attribute>
			    				<xsl:attribute name="style">cursor:pointer</xsl:attribute>
	    						<xsl:value-of select="$classExtend"/>
	    					</pre>
	    				</xsl:when>
	    				<xsl:otherwise>
	    					<pre><xsl:value-of select="$classExtend"/></pre>
	    				</xsl:otherwise>
	    			</xsl:choose>
	    		</xsl:for-each>
			</div>
	    </xsl:if>

	    <xsl:if test=".//var[@name='requires']">
	    	<div class="ConstructorSummary">
	    		<b>Requires:</b>
	    		<xsl:for-each select=".//var[@name='requires']">
	    			<xsl:variable name="classRequires">
	    				<xsl:value-of select="normalize-space(value/p/text())"/>
	    			</xsl:variable>
	    			<xsl:choose>
	    				<xsl:when test="//class[@name=$classRequires]">
	    					<pre>
			    				<xsl:attribute name="onclick">
			    					<xsl:text>app.UpdateClassInfo('</xsl:text>
									<xsl:value-of select="$classRequires"/>
									<xsl:text>')</xsl:text>
			    				</xsl:attribute>
			    				<xsl:attribute name="style">cursor:pointer</xsl:attribute>
	    						<xsl:value-of select="$classRequires"/>
	    					</pre>
	    				</xsl:when>
	    				<xsl:otherwise>
	    					<pre><xsl:value-of select="$classRequires"/></pre>
	    				</xsl:otherwise>
	    			</xsl:choose>
	    		</xsl:for-each>
	    	</div>
	    </xsl:if>

	    <xsl:if test=".//var[@name='see']">
	    	<div class="ConstructorSummary">
	    		<b>See Also:</b>
	    		<xsl:for-each select=".//var[@name='see']">
	    			<xsl:variable name="classSee">
	    				<xsl:value-of select="normalize-space(value/p/text())"/>
	    			</xsl:variable>
	    			<xsl:choose>
	    				<xsl:when test="//class[@name=$classSee]">
	    					<pre>
			    				<xsl:attribute name="onclick">
			    					<xsl:text>app.UpdateClassInfo('</xsl:text>
									<xsl:value-of select="$classSee"/>
									<xsl:text>')</xsl:text>
			    				</xsl:attribute>
			    				<xsl:attribute name="style">cursor:pointer</xsl:attribute>
	    						<xsl:value-of select="$classSee"/>
	    					</pre>
	    				</xsl:when>
	    				<xsl:otherwise>
	    					<pre><xsl:value-of select="$classSee"/></pre>
	    				</xsl:otherwise>
	    			</xsl:choose>
	    		</xsl:for-each>
	    	</div>
	    </xsl:if>

		</div>

		<xsl:if test="class-methods/method[@mapped_name='GetInstance'] or instance-methods/method or instance-fields/field">
		    <h2>Constructor Summary</h2>

			<div class="ConstructorSummary">
	   			<xsl:copy-of select="constructor_detail/p"/>
				<xsl:choose>
					<xsl:when test="class-methods/method[@mapped_name='GetInstance']">
						<pre><b><xsl:value-of select="$classname"/>.GetInstance</b>()</pre>
					</xsl:when>
					<xsl:otherwise>
		    			<pre><b>new <xsl:value-of select="$classname"/></b><xsl:value-of select="constructor_args"/></pre>
		    		</xsl:otherwise>
		    	</xsl:choose>
		    </div>
	    </xsl:if>

	    <xsl:if test="instance-fields/field">

		    <h2>Field Summary</h2>
			<xsl:for-each select="instance-fields/field">
				<xsl:sort select="@name"/>
				<div class="FieldSummary">
				<pre>
				<xsl:if test="vars/var[@name='private']"><![CDATA[<private> ]]></xsl:if>
				<xsl:if test="vars/var[@name='final']"><![CDATA[<final> ]]></xsl:if>
				<xsl:if test="vars/var[@name='static']"><![CDATA[<static> ]]></xsl:if>
				<xsl:if test="vars/var[@name='type']"><xsl:value-of select="vars/var[@name='type']/value/p/text()"/><xsl:text> </xsl:text></xsl:if>
				<b><xsl:value-of select="@name"/></b>
				</pre>

				<xsl:if test="field-description/p"><xsl:copy-of select="field-description/p"/></xsl:if>
				</div>
			</xsl:for-each>
	    </xsl:if>

	    <xsl:if test="instance-methods/method">

		    <h2>Method Summary</h2>

			<xsl:for-each select="instance-methods/method">
				<xsl:sort select="@name"/>
				<div class="MethodSummary">
				<pre>
				<xsl:if test="vars/var[@name='private']"><![CDATA[<private> ]]></xsl:if>
				<xsl:if test="vars/var[@name='final']"><![CDATA[<final> ]]></xsl:if>
				<xsl:if test="vars/var[@name='static']"><![CDATA[<static> ]]></xsl:if>
				<xsl:if test="vars/var[@name='type']"><xsl:value-of select="vars/var[@name='type']/value/p/text()"/><xsl:text> </xsl:text></xsl:if>
				<b><xsl:value-of select="@mapped_name"/></b><xsl:value-of select="argument_list"/>
				</pre>

				<xsl:if test="description/p"><xsl:copy-of select="description/p"/></xsl:if>
				</div>
			</xsl:for-each>

	    </xsl:if>

	    <xsl:if test="class-methods/method">

		    <h2>Static Method Summary</h2>

			<xsl:for-each select="class-methods/method">
				<xsl:sort select="@name"/>
				<div class="MethodSummary">
				<pre>
				<xsl:if test="vars/var[@name='private']"><![CDATA[<private> ]]></xsl:if>
				<xsl:if test="vars/var[@name='final']"><![CDATA[<final> ]]></xsl:if>
				<xsl:if test="vars/var[@name='static']"><![CDATA[<static> ]]></xsl:if>
				<xsl:if test="vars/var[@name='type']"><xsl:value-of select="vars/var[@name='type']/value/p/text()"/><xsl:text> </xsl:text></xsl:if>
				<b><xsl:value-of select="@mapped_name"/></b><xsl:value-of select="argument_list"/>
				</pre>

				<xsl:if test="description/p"><xsl:copy-of select="description/p"/></xsl:if>
				</div>
			</xsl:for-each>

	    </xsl:if>

	    <hr/>

		<xsl:if test="class-methods/method[@mapped_name='GetInstance'] or instance-methods/method or instance-fields/field">
		    <h2>Constructor Detail</h2>
		    <div class="ConstructorDetail">

			    <xsl:copy-of select="constructor_detail/p"/>
		    	<xsl:choose>

		    		<xsl:when test="class-methods/method[@mapped_name='GetInstance']">
		    			<p>
		    				<i>This class implements the Singleton Pattern</i><br/>
							<b><xsl:value-of select="$classname"/>.GetInstance</b>()
						</p>
		    		</xsl:when>
		    		<xsl:otherwise>
					    <b>new <xsl:value-of select="$classname"/></b><xsl:value-of select="constructor_args"/>

					    <xsl:if test="constructor_vars/var[@name='param']">
							<b>Parameters:</b><br/>
							<xsl:copy-of select="constructor_vars/var[@name='param']/value"/>
					    </xsl:if>
				    </xsl:otherwise>

			    </xsl:choose>
		    </div>
	    </xsl:if>

	    <xsl:if test="instance-fields/field">

		    <h2>Field Detail</h2>

			<xsl:for-each select="instance-fields/field">
				<xsl:sort select="@name"/>
				<div class="FieldDetail">
				<pre>
				<xsl:if test="vars/var[@name='private']"><![CDATA[<private> ]]></xsl:if>
				<xsl:if test="vars/var[@name='final']"><![CDATA[<final> ]]></xsl:if>
				<xsl:if test="vars/var[@name='static']"><![CDATA[<static> ]]></xsl:if>
				<xsl:if test="vars/var[@name='type']"><xsl:value-of select="vars/var[@name='type']/value/p/text()"/><xsl:text> </xsl:text></xsl:if>
				<b><xsl:value-of select="@name"/></b>
				</pre>

				<xsl:if test="field-description/p"><xsl:copy-of select="field-description/p"/></xsl:if>
				</div>
			</xsl:for-each>

	    </xsl:if>

	    <xsl:if test="instance-methods/method">

		    <h2>Method Detail</h2>

			<xsl:for-each select="instance-methods/method">
				<xsl:sort select="@name"/>
				<div class="MethodDetail">
				<pre>
				<xsl:if test="vars/var[@name='private']"><![CDATA[<private> ]]></xsl:if>
				<xsl:if test="vars/var[@name='final']"><![CDATA[<final> ]]></xsl:if>
				<xsl:if test="vars/var[@name='static']"><![CDATA[<static> ]]></xsl:if>
				<xsl:if test="vars/var[@name='type']"><xsl:value-of select="vars/var[@name='type']/value/p/text()"/><xsl:text> </xsl:text></xsl:if>
				<b><xsl:value-of select="@mapped_name"/></b><xsl:value-of select="argument_list"/>
				</pre>

				<xsl:if test="description/p"><i><xsl:copy-of select="description/p"/></i></xsl:if>

				<xsl:if test="vars/var[@name='param']">
					<b>Parameters:</b>
					<ul>
						<xsl:for-each select="vars/var[@name='param']">
							<li><pre><xsl:copy-of select="value/p"/></pre></li>
						</xsl:for-each>
					</ul>
				</xsl:if>

				<xsl:if test="vars/var[@name='return']">
					<b>Returns:</b>
					<xsl:copy-of select="vars/var[@name='return']/value/p"/>
				</xsl:if>

				<xsl:if test="vars/var[@name='author']">
					<b>Author:</b>
					<xsl:copy-of select="vars/var[@name='author']/value/p"/>
				</xsl:if>

				</div>

			</xsl:for-each>

	    </xsl:if>

	    <xsl:if test="class-methods/method">

		    <h2>Static Method Detail</h2>

			<xsl:for-each select="class-methods/method">
				<xsl:sort select="@name"/>
				<div class="MethodDetail">
				<pre>
				<xsl:if test="vars/var[@name='private']"><![CDATA[<private> ]]></xsl:if>
				<xsl:if test="vars/var[@name='final']"><![CDATA[<final> ]]></xsl:if>
				<xsl:if test="vars/var[@name='static']"><![CDATA[<static> ]]></xsl:if>
				<xsl:if test="vars/var[@name='type']"><xsl:value-of select="vars/var[@name='type']/value/p/text()"/><xsl:text> </xsl:text></xsl:if>
				<b><xsl:value-of select="@mapped_name"/></b><xsl:value-of select="argument_list"/>
				</pre>

				<xsl:if test="description/p"><i><xsl:copy-of select="description/p"/></i></xsl:if>

				<xsl:if test="vars/var[@name='param']">
					<b>Parameters:</b>
					<ul>
						<xsl:for-each select="vars/var[@name='param']">
							<li><pre><xsl:copy-of select="value/p"/></pre></li>
						</xsl:for-each>
					</ul>
				</xsl:if>

				<xsl:if test="vars/var[@name='return']">
					<b>Returns:</b>
					<xsl:copy-of select="vars/var[@name='return']/value/p"/>
				</xsl:if>

				<xsl:if test="vars/var[@name='author']">
					<b>Author:</b>
					<xsl:copy-of select="vars/var[@name='author']/value/p"/>
				</xsl:if>

				</div>

			</xsl:for-each>

	    </xsl:if>


	    </div>

  </xsl:template>

  <xsl:template match="/">
  	<xsl:apply-templates/>
  </xsl:template>

</xsl:stylesheet>
