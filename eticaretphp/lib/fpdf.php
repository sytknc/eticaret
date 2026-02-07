<?php
/*******************************************************************************
* FPDF                                                                         *
* Version: 1.86                                                                *
* Date:    2023-05-23                                                          *
* Author:  Olivier PLATHEY                                                     *
*******************************************************************************/

if(!defined('FPDF_VERSION'))	define('FPDF_VERSION','1.86');

class FPDF
{
	protected $page;               // current page number
	protected $n;                  // current object number
	protected $offsets;            // array of object offsets
	protected $buffer;             // buffer holding in-memory PDF
	protected $pages;              // array containing pages
	protected $state;              // current document state
	protected $compress;           // compression flag
	protected $k;                  // scale factor (number of points in user unit)
	protected $DefOrientation;     // default orientation
	protected $CurOrientation;     // current orientation
	protected $StdPageSizes;       // standard page sizes
	protected $DefPageSize;        // default page size
	protected $CurPageSize;        // current page size
	protected $PageInfo;           // page-related data
	protected $wPt, $hPt;          // dimensions of current page in points
	protected $w, $h;              // dimensions of current page in user unit
	protected $lMargin;            // left margin
	protected $tMargin;            // top margin
	protected $rMargin;            // right margin
	protected $bMargin;            // page break margin
	protected $cMargin;            // cell margin
	protected $x, $y;              // current position in user unit
	protected $lasth;              // height of last printed cell
	protected $LineWidth;          // line width in user unit
	protected $fontpath;           // path containing fonts
	protected $CoreFonts;          // array of core font names
	protected $fonts;              // array of used fonts
	protected $FontFiles;          // array of font files
	protected $diffs;              // array of encoding differences
	protected $images;             // array of used images
	protected $links;              // array of links in pages
	protected $FontFamily;         // current font family
	protected $FontStyle;          // current font style
	protected $underline;          // underlining flag
	protected $CurrentFont;        // current font info
	protected $FontSizePt;         // current font size in points
	protected $FontSize;           // current font size in user unit
	protected $DrawColor;          // commands for drawing color
	protected $FillColor;          // commands for filling color
	protected $TextColor;          // commands for text color
	protected $ColorFlag;          // indicates whether fill and text colors are different
	protected $ws;                 // word spacing
	protected $AutoPageBreak;      // automatic page breaking
	protected $PageBreakTrigger;   // threshold used to trigger page breaks
	protected $InHeader;           // flag set when processing header
	protected $InFooter;           // flag set when processing footer
	protected $ZoomMode;           // zoom display mode
	protected $LayoutMode;         // layout display mode
	protected $title;              // title
	protected $subject;            // subject
	protected $author;             // author
	protected $keywords;           // keywords
	protected $creator;            // creator
	protected $AliasNbPages;       // alias for total number of pages
	protected $PDFVersion;         // PDF version number

	function __construct($orientation='P', $unit='mm', $size='A4')
	{
		$this->_dochecks();
		$this->page=0;
		$this->n=2;
		$this->buffer='';
		$this->pages=array();
		$this->PageInfo=array();
		$this->state=0;
		$this->fonts=array();
		$this->FontFiles=array();
		$this->diffs=array();
		$this->images=array();
		$this->links=array();
		$this->InHeader=false;
		$this->InFooter=false;
		$this->lasth=0;
		$this->FontFamily='';
		$this->FontStyle='';
		$this->FontSizePt=12;
		$this->underline=false;
		$this->DrawColor='0 G';
		$this->FillColor='0 g';
		$this->TextColor='0 g';
		$this->ColorFlag=false;
		$this->ws=0;
		$this->CoreFonts=array('courier'=>'Courier', 'courierB'=>'Courier-Bold', 'courierI'=>'Courier-Oblique',
			'courierBI'=>'Courier-BoldOblique', 'helvetica'=>'Helvetica', 'helveticaB'=>'Helvetica-Bold',
			'helveticaI'=>'Helvetica-Oblique', 'helveticaBI'=>'Helvetica-BoldOblique', 'times'=>'Times-Roman',
			'timesB'=>'Times-Bold', 'timesI'=>'Times-Italic', 'timesBI'=>'Times-BoldItalic', 'symbol'=>'Symbol',
			'zapfdingbats'=>'ZapfDingbats');
		$this->fontpath='';
		if(defined('FPDF_FONTPATH'))
			$this->fontpath=FPDF_FONTPATH;
		if($unit=='pt')
			$this->k=1;
		elseif($unit=='mm')
			$this->k=72/25.4;
		elseif($unit=='cm')
			$this->k=72/2.54;
		elseif($unit=='in')
			$this->k=72;
		else
			$this->Error('Incorrect unit: '.$unit);
		$this->StdPageSizes=array('a3'=>array(841.89,1190.55), 'a4'=>array(595.28,841.89),
			'a5'=>array(420.94,595.28), 'letter'=>array(612,792), 'legal'=>array(612,1008));
		$size=$this->_getpagesize($size);
		$this->DefPageSize=$size;
		$this->CurPageSize=$size;
		$this->DefOrientation=$orientation;
		$this->CurOrientation=$orientation;
		$this->w=$size[0]/$this->k;
		$this->h=$size[1]/$this->k;
		$this->wPt=$size[0];
		$this->hPt=$size[1];
		if($orientation=='P')
		{
			$this->DefOrientation='P';
			$this->w=$size[0]/$this->k;
			$this->h=$size[1]/$this->k;
		}
		else
		{
			$this->DefOrientation='L';
			$this->w=$size[1]/$this->k;
			$this->h=$size[0]/$this->k;
		}
		$this->CurOrientation=$this->DefOrientation;
		$this->wPt=$this->w*$this->k;
		$this->hPt=$this->h*$this->k;
		$this->SetMargins(10,10,10);
		$this->cMargin=1;
		$this->LineWidth=.2;
		$this->SetAutoPageBreak(true,20);
		$this->SetDisplayMode('default');
		$this->SetCompression(true);
		$this->PDFVersion='1.3';
	}

	function SetMargins($left, $top, $right=null)
	{
		$this->lMargin=$left;
		$this->tMargin=$top;
		if($right===null)
			$right=$left;
		$this->rMargin=$right;
	}

	function SetLeftMargin($margin)
	{
		$this->lMargin=$margin;
		if($this->page>0 && $this->x<$margin)
			$this->x=$margin;
	}

	function SetTopMargin($margin)
	{
		$this->tMargin=$margin;
	}

	function SetRightMargin($margin)
	{
		$this->rMargin=$margin;
	}

	function SetAutoPageBreak($auto, $margin=0)
	{
		$this->AutoPageBreak=$auto;
		$this->bMargin=$margin;
		$this->PageBreakTrigger=$this->h-$margin;
	}

	function SetDisplayMode($zoom, $layout='default')
	{
		if($zoom=='fullpage' || $zoom=='fullwidth' || $zoom=='real' || $zoom=='default' || !is_string($zoom))
			$this->ZoomMode=$zoom;
		else
			$this->Error('Incorrect zoom display mode: '.$zoom);
		if($layout=='single' || $layout=='continuous' || $layout=='two' || $layout=='default')
			$this->LayoutMode=$layout;
		else
			$this->Error('Incorrect layout display mode: '.$layout);
	}

	function SetCompression($compress)
	{
		if(function_exists('gzcompress'))
			$this->compress=$compress;
		else
			$this->compress=false;
	}

	function SetTitle($title, $isUTF8=false)
	{
		$this->title=$isUTF8 ? $title : utf8_encode($title);
	}

	function SetSubject($subject, $isUTF8=false)
	{
		$this->subject=$isUTF8 ? $subject : utf8_encode($subject);
	}

	function SetAuthor($author, $isUTF8=false)
	{
		$this->author=$isUTF8 ? $author : utf8_encode($author);
	}

	function SetKeywords($keywords, $isUTF8=false)
	{
		$this->keywords=$isUTF8 ? $keywords : utf8_encode($keywords);
	}

	function SetCreator($creator, $isUTF8=false)
	{
		$this->creator=$isUTF8 ? $creator : utf8_encode($creator);
	}

	function AliasNbPages($alias='{nb}')
	{
		$this->AliasNbPages=$alias;
	}

	function Error($msg)
	{
		die('<b>FPDF error:</b> '.$msg);
	}

	function Open()
	{
		$this->state=1;
	}

	function Close()
	{
		if($this->state==3)
			return;
		if($this->page==0)
			$this->AddPage();
		$this->InFooter=true;
		$this->Footer();
		$this->InFooter=false;
		$this->_endpage();
		$this->_enddoc();
	}

	function AddPage($orientation='', $size='')
	{
		if($this->state==0)
			$this->Open();
		$family=$this->FontFamily;
		$style=$this->FontStyle.($this->underline ? 'U' : '');
		$fontsize=$this->FontSizePt;
		$lw=$this->LineWidth;
		$dc=$this->DrawColor;
		$fc=$this->FillColor;
		$tc=$this->TextColor;
		$cf=$this->ColorFlag;
		if($this->page>0)
		{
			$this->InFooter=true;
			$this->Footer();
			$this->InFooter=false;
			$this->_endpage();
		}
		$this->_beginpage($orientation,$size);
		$this->LineWidth=$lw;
		$this->_out(sprintf('%.2F w',$lw*$this->k));
		if($family)
			$this->SetFont($family,$style,$fontsize);
		$this->DrawColor=$dc;
		if($dc!='0 G')
			$this->_out($dc);
		$this->FillColor=$fc;
		if($fc!='0 g')
			$this->_out($fc);
		$this->TextColor=$tc;
		$this->ColorFlag=$cf;
		$this->Header();
		if($this->LineWidth!=$lw)
		{
			$this->LineWidth=$lw;
			$this->_out(sprintf('%.2F w',$lw*$this->k));
		}
		if($family)
			$this->SetFont($family,$style,$fontsize);
		$this->DrawColor=$dc;
		if($dc!='0 G')
			$this->_out($dc);
		$this->FillColor=$fc;
		if($fc!='0 g')
			$this->_out($fc);
		$this->TextColor=$tc;
		$this->ColorFlag=$cf;
	}

	function Header() {}
	function Footer() {}

	function PageNo()
	{
		return $this->page;
	}

	function SetDrawColor($r, $g=null, $b=null)
	{
		if(($r==0 && $g==0 && $b==0) || $g===null)
			$this->DrawColor=sprintf('%.3F G',$r/255);
		else
			$this->DrawColor=sprintf('%.3F %.3F %.3F RG',$r/255,$g/255,$b/255);
		if($this->page>0)
			$this->_out($this->DrawColor);
	}

	function SetFillColor($r, $g=null, $b=null)
	{
		if(($r==0 && $g==0 && $b==0) || $g===null)
			$this->FillColor=sprintf('%.3F g',$r/255);
		else
			$this->FillColor=sprintf('%.3F %.3F %.3F rg',$r/255,$g/255,$b/255);
		$this->ColorFlag=($this->FillColor!=$this->TextColor);
		if($this->page>0)
			$this->_out($this->FillColor);
	}

	function SetTextColor($r, $g=null, $b=null)
	{
		if(($r==0 && $g==0 && $b==0) || $g===null)
			$this->TextColor=sprintf('%.3F g',$r/255);
		else
			$this->TextColor=sprintf('%.3F %.3F %.3F rg',$r/255,$g/255,$b/255);
		$this->ColorFlag=($this->FillColor!=$this->TextColor);
	}

	function SetLineWidth($width)
	{
		$this->LineWidth=$width;
		if($this->page>0)
			$this->_out(sprintf('%.2F w',$width*$this->k));
	}

	function Line($x1, $y1, $x2, $y2)
	{
		$this->_out(sprintf('%.2F %.2F m %.2F %.2F l S',$x1*$this->k,($this->h-$y1)*$this->k,$x2*$this->k,($this->h-$y2)*$this->k));
	}

	function Rect($x, $y, $w, $h, $style='')
	{
		if($style=='F')
			$op='f';
		elseif($style=='FD' || $style=='DF')
			$op='B';
		else
			$op='S';
		$this->_out(sprintf('%.2F %.2F %.2F %.2F re %s',$x*$this->k,($this->h-$y)*$this->k,$w*$this->k,-$h*$this->k,$op));
	}

	function AddFont($family, $style='', $file='')
	{
		if($file=='')
			$file=str_replace(' ','',$family).strtolower($style).'.php';
		$family=strtolower($family);
		if($style=='IB')
			$style='BI';
		$fontkey=$family.$style;
		if(isset($this->fonts[$fontkey]))
			return;
		$file=$this->fontpath.$file;
		if(!file_exists($file))
			$this->Error('Font file not found: '.$file);
		include($file);
		if(!isset($name))
			$this->Error('Could not include font definition file');
		$i=count($this->fonts)+1;
		$this->fonts[$fontkey]=array('i'=>$i, 'type'=>$type, 'name'=>$name, 'desc'=>$desc, 'up'=>$up, 'ut'=>$ut, 'cw'=>$cw, 'enc'=>$enc, 'diff'=>$diff, 'file'=>$file, 'originalsize'=>$originalsize);
		if($file)
		{
			if($type=='TrueTypeUnicode')
				$this->FontFiles[$file]=array('length1'=>$originalsize, 'length2'=>0, 'length3'=>0);
			else
				$this->FontFiles[$file]=array('length1'=>$originalsize, 'length2'=>0);
		}
	}

	function SetFont($family, $style='', $size=0)
	{
		$family=strtolower($family);
		if($family=='')
			$family=$this->FontFamily;
		if($family=='arial')
			$family='helvetica';
		elseif($family=='symbol' || $family=='zapfdingbats')
			$style='';
		$style=strtoupper($style);
		if(strpos($style,'U')!==false)
		{
			$this->underline=true;
			$style=str_replace('U','',$style);
		}
		else
			$this->underline=false;
		if($style=='IB')
			$style='BI';
		if($size==0)
			$size=$this->FontSizePt;
		if($this->FontFamily==$family && $this->FontStyle==$style && $this->FontSizePt==$size)
			return;
		$fontkey=$family.$style;
		if(!isset($this->fonts[$fontkey]))
		{
			if(isset($this->CoreFonts[$fontkey]))
				$this->fonts[$fontkey]=array('i'=>count($this->fonts)+1, 'type'=>'core', 'name'=>$this->CoreFonts[$fontkey], 'up'=>-100, 'ut'=>50, 'cw'=>$this->_getfontwidths($fontkey));
			else
				$this->Error('Undefined font: '.$family.' '.$style);
		}
		$this->FontFamily=$family;
		$this->FontStyle=$style;
		$this->FontSizePt=$size;
		$this->FontSize=$size/$this->k;
		$this->CurrentFont=&$this->fonts[$fontkey];
		if($this->page>0)
			$this->_out(sprintf('BT /F%d %.2F Tf ET',$this->CurrentFont['i'],$this->FontSizePt));
	}

	function SetFontSize($size)
	{
		if($this->FontSizePt==$size)
			return;
		$this->FontSizePt=$size;
		$this->FontSize=$size/$this->k;
		if($this->page>0)
			$this->_out(sprintf('BT /F%d %.2F Tf ET',$this->CurrentFont['i'],$this->FontSizePt));
	}

	function SetXY($x, $y)
	{
		$this->x=$x;
		$this->y=$y;
	}

	function SetX($x)
	{
		$this->x=$x;
	}

	function SetY($y, $resetX=true)
	{
		$this->y=$y;
		if($resetX)
			$this->x=$this->lMargin;
	}

	function Cell($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false, $link='')
	{
		$k=$this->k;
		if($this->y+$h>$this->PageBreakTrigger && !$this->InHeader && !$this->InFooter && $this->AcceptPageBreak())
		{
			$x=$this->x;
			$ws=$this->ws;
			if($ws>0)
			{
				$this->ws=0;
				$this->_out('0 Tw');
			}
			$this->AddPage($this->CurOrientation,$this->CurPageSize);
			$this->x=$x;
			if($ws>0)
			{
				$this->ws=$ws;
				$this->_out(sprintf('%.3F Tw',$ws*$k));
			}
		}
		if($w==0)
			$w=$this->w-$this->rMargin-$this->x;
		$s='';
		if($fill || $border==1)
		{
			if($fill)
				$op=($border==1) ? 'B' : 'f';
			else
				$op='S';
			$s=sprintf('%.2F %.2F %.2F %.2F re %s ',$this->x*$k,($this->h-$this->y)*$k,$w*$k,-$h*$k,$op);
		}
		if(is_string($border))
		{
			$x=$this->x; $y=$this->y;
			if(strpos($border,'L')!==false)
				$s.=sprintf('%.2F %.2F m %.2F %.2F l S ',$x*$k,($this->h-$y)*$k,$x*$k,($this->h-($y+$h))*$k);
			if(strpos($border,'T')!==false)
				$s.=sprintf('%.2F %.2F m %.2F %.2F l S ',$x*$k,($this->h-$y)*$k,($x+$w)*$k,($this->h-$y)*$k);
			if(strpos($border,'R')!==false)
				$s.=sprintf('%.2F %.2F m %.2F %.2F l S ',($x+$w)*$k,($this->h-$y)*$k,($x+$w)*$k,($this->h-($y+$h))*$k);
			if(strpos($border,'B')!==false)
				$s.=sprintf('%.2F %.2F m %.2F %.2F l S ',$x*$k,($this->h-($y+$h))*$k,($x+$w)*$k,($this->h-($y+$h))*$k);
		}
		if($txt!=='')
		{
			if($align=='R')
				$dx=$w-$this->cMargin-$this->GetStringWidth($txt);
			elseif($align=='C')
				$dx=($w-$this->GetStringWidth($txt))/2;
			else
				$dx=$this->cMargin;
			if($this->ColorFlag)
				$s.='q '.$this->TextColor.' ';
			$txt2=$this->_escape($txt);
			$s.=sprintf('BT %.2F %.2F Td (%s) Tj ET',$this->x+$dx,($this->h-($this->y+.5*$h+.3*$this->FontSize))*$k,$txt2);
			if($this->underline)
				$s.=' '.$this->_dounderline($this->x+$dx,$this->y+.5*$h+.3*$this->FontSize,$txt);
			if($this->ColorFlag)
				$s.=' Q';
		}
		if($s)
			$this->_out($s);
		$this->lasth=$h;
		if($ln>0)
		{
			$this->y+=$h;
			if($ln==1)
				$this->x=$this->lMargin;
		}
		else
			$this->x+=$w;
	}

	function MultiCell($w, $h, $txt, $border=0, $align='J', $fill=false)
	{
		$txt=(string)$txt;
		$cw=&$this->CurrentFont['cw'];
		if($w==0)
			$w=$this->w-$this->rMargin-$this->x;
		$wmax=($w-2*$this->cMargin)*1000/$this->FontSize;
		$s=str_replace("\r",'', $txt);
		$nb=strlen($s);
		if($nb>0 && $s[$nb-1]=="\n")
			$nb--;
		$b=0;
		if($border)
		{
			if($border==1)
			{
				$border='LTRB';
				$b='LRT';
				$b2='LR';
			}
			else
			{
				$b2='';
				if(strpos($border,'L')!==false)
					$b2.='L';
				if(strpos($border,'R')!==false)
					$b2.='R';
				$b=(strpos($border,'T')!==false) ? $b2.'T' : $b2;
			}
		}
		$sep=-1;
		$i=0;
		$j=0;
		$l=0;
		$ns=0;
		$nl=1;
		while($i<$nb)
		{
			$c=$s[$i];
			if($c=="\n")
			{
				if($this->ws>0)
				{
					$this->ws=0;
					$this->_out('0 Tw');
				}
				$this->Cell($w,$h,substr($s,$j,$i-$j),$b,2,$align,$fill);
				$i++;
				$sep=-1;
				$j=$i;
				$l=0;
				$ns=0;
				$nl++;
				if($border && $nl==2)
					$b=$b2;
				continue;
			}
			if($c==' ')
			{
				$sep=$i;
				$ls=$l;
				$ns++;
			}
			$l+=$cw[$c];
			if($l>$wmax)
			{
				if($sep==-1)
				{
					if($i==$j)
						$i++;
					if($this->ws>0)
					{
						$this->ws=0;
						$this->_out('0 Tw');
					}
					$this->Cell($w,$h,substr($s,$j,$i-$j),$b,2,$align,$fill);
				}
				else
				{
					if($align=='J')
					{
						$this->ws=($ns>1) ? ($wmax-$ls)/1000*$this->FontSize/($ns-1) : 0;
						$this->_out(sprintf('%.3F Tw',$this->ws*$this->k));
					}
					$this->Cell($w,$h,substr($s,$j,$sep-$j),$b,2,$align,$fill);
					$i=$sep+1;
				}
				$sep=-1;
				$j=$i;
				$l=0;
				$ns=0;
				$nl++;
				if($border && $nl==2)
					$b=$b2;
			}
			else
				$i++;
		}
		if($this->ws>0)
		{
			$this->ws=0;
			$this->_out('0 Tw');
		}
		$this->Cell($w,$h,substr($s,$j,$i-$j),$b,2,$align,$fill);
		$this->x=$this->lMargin;
	}

	function Write($h, $txt, $link='')
	{
		$txt=(string)$txt;
		$cw=&$this->CurrentFont['cw'];
		$w=$this->w-$this->rMargin-$this->x;
		$wmax=($w-2*$this->cMargin)*1000/$this->FontSize;
		$s=str_replace("\r",'', $txt);
		$nb=strlen($s);
		$sep=-1;
		$i=0;
		$j=0;
		$l=0;
		$nl=1;
		while($i<$nb)
		{
			$c=$s[$i];
			if($c=="\n")
			{
				$this->Cell($w,$h,substr($s,$j,$i-$j),0,2,'',false,$link);
				$i++;
				$sep=-1;
				$j=$i;
				$l=0;
				if($nl==1)
				{
					$this->x=$this->lMargin;
					$w=$this->w-$this->rMargin-$this->x;
					$wmax=($w-2*$this->cMargin)*1000/$this->FontSize;
				}
				$nl++;
				continue;
			}
			if($c==' ')
				$sep=$i;
			$l+=$cw[$c];
			if($l>$wmax)
			{
				if($sep==-1)
				{
					if($this->x>$this->lMargin)
					{
						$this->Cell($w,$h,substr($s,$j,$i-$j),0,2,'',false,$link);
						$this->x=$this->lMargin;
						$w=$this->w-$this->rMargin-$this->x;
						$wmax=($w-2*$this->cMargin)*1000/$this->FontSize;
						$i++;
						$sep=-1;
						$j=$i;
						$l=0;
						$nl++;
						continue;
					}
					if($i==$j)
						$i++;
					$this->Cell($w,$h,substr($s,$j,$i-$j),0,2,'',false,$link);
				}
				else
				{
					$this->Cell($w,$h,substr($s,$j,$sep-$j),0,2,'',false,$link);
					$i=$sep+1;
				}
				$sep=-1;
				$j=$i;
				$l=0;
				if($nl==1)
				{
					$this->x=$this->lMargin;
					$w=$this->w-$this->rMargin-$this->x;
					$wmax=($w-2*$this->cMargin)*1000/$this->FontSize;
				}
				$nl++;
			}
			else
				$i++;
		}
		if($i!=$j)
			$this->Cell($l/1000*$this->FontSize,$h,substr($s,$j,$i-$j),0,0,'',false,$link);
	}

	function AcceptPageBreak()
	{
		return $this->AutoPageBreak;
	}

	function Image($file, $x=null, $y=null, $w=0, $h=0, $type='', $link='')
	{
		if(!isset($this->images[$file]))
		{
			$info=$this->_parseimage($file);
			if($info=='')
				$this->Error('Unsupported image type: '.$file);
			$info['i']=count($this->images)+1;
			$this->images[$file]=$info;
		}
		else
			$info=$this->images[$file];
		if($w==0 && $h==0)
		{
			$w=$info['w']/$this->k;
			$h=$info['h']/$this->k;
		}
		if($w==0)
			$w=$h*$info['w']/$info['h'];
		if($h==0)
			$h=$w*$info['h']/$info['w'];
		if($x===null)
			$x=$this->x;
		if($y===null)
			$y=$this->y;
		$this->_out(sprintf('q %.2F 0 0 %.2F %.2F %.2F cm /I%d Do Q',$w*$this->k,$h*$this->k,$x*$this->k,($this->h-$y-$h)*$this->k,$info['i']));
		if($link)
			$this->Link($x,$y,$w,$h,$link);
	}

	function Link($x, $y, $w, $h, $link)
	{
		$this->links[$this->page][]=array($x*$this->k, $this->hPt-$y*$this->k, $w*$this->k, $h*$this->k, $link);
	}

	function GetStringWidth($s)
	{
		$s=(string)$s;
		$cw=&$this->CurrentFont['cw'];
		$w=0;
		$l=strlen($s);
		for($i=0;$i<$l;$i++)
			$w+=$cw[$s[$i]];
		return $w*$this->FontSize/1000;
	}

	function Output($name='', $dest='')
	{
		if($this->state<3)
			$this->Close();
		$dest=strtoupper($dest);
		if($dest=='')
		{
			if($name=='')
				$name='doc.pdf';
			$dest='I';
		}
		if($dest=='I')
		{
			if(ob_get_length())
				$this->Error('Some data has already been output, can\'t send PDF file');
			header('Content-Type: application/pdf');
			header('Content-Disposition: inline; filename="'.$name.'"');
			header('Cache-Control: private, max-age=0, must-revalidate');
			header('Pragma: public');
			echo $this->buffer;
		}
		elseif($dest=='D')
		{
			if(ob_get_length())
				$this->Error('Some data has already been output, can\'t send PDF file');
			header('Content-Type: application/x-download');
			header('Content-Disposition: attachment; filename="'.$name.'"');
			header('Cache-Control: private, max-age=0, must-revalidate');
			header('Pragma: public');
			echo $this->buffer;
		}
		elseif($dest=='F')
			file_put_contents($name,$this->buffer);
		elseif($dest=='S')
			return $this->buffer;
		else
			$this->Error('Incorrect output destination: '.$dest);
		return '';
	}

	protected function _dochecks()
	{
		if(1.0>1.00001)
			$this->Error('This version of PHP is not supported');
		if(!function_exists('gzcompress'))
			$this->Error('zlib extension is not enabled');
	}

	protected function _getpagesize($size)
	{
		if(is_string($size))
		{
			$size=strtolower($size);
			if(!isset($this->StdPageSizes[$size]))
				$this->Error('Unknown page size: '.$size);
			$a=$this->StdPageSizes[$size];
			return array($a[0], $a[1]);
		}
		else
		{
			if($size[0]>$size[1])
				return array($size[1], $size[0]);
			else
				return $size;
		}
	}

	protected function _beginpage($orientation, $size)
	{
		$this->page++;
		$this->pages[$this->page]='';
		$this->state=2;
		$this->x=$this->lMargin;
		$this->y=$this->tMargin;
		$this->FontFamily='';
		if($orientation=='')
			$orientation=$this->DefOrientation;
		else
			$orientation=strtoupper($orientation[0]);
		if($size=='')
			$size=$this->DefPageSize;
		else
			$size=$this->_getpagesize($size);
		if($orientation!=$this->CurOrientation || $size[0]!=$this->CurPageSize[0] || $size[1]!=$this->CurPageSize[1])
		{
			if($orientation=='P')
			{
				$this->w=$size[0]/$this->k;
				$this->h=$size[1]/$this->k;
			}
			else
			{
				$this->w=$size[1]/$this->k;
				$this->h=$size[0]/$this->k;
			}
			$this->wPt=$this->w*$this->k;
			$this->hPt=$this->h*$this->k;
			$this->CurOrientation=$orientation;
			$this->CurPageSize=$size;
		}
		$this->PageInfo[$this->page]=array('size'=>$this->CurPageSize, 'orientation'=>$this->CurOrientation);
	}

	protected function _endpage()
	{
		$this->state=1;
	}

	protected function _enddoc()
	{
		$this->_putheader();
		$this->_putpages();
		$this->_putresources();
		$this->_putinfo();
		$this->_putcatalog();
		$this->_puttrailer();
		$this->_endofdoc();
	}

	protected function _putheader()
	{
		$this->_out('%PDF-'.$this->PDFVersion);
	}

	protected function _putpages()
	{
		$nb=$this->page;
		for($n=1;$n<=$nb;$n++)
		{
			$this->_newobj();
			$this->_out('<</Type /Page');
			$this->_out('/Parent 1 0 R');
			if(isset($this->PageInfo[$n]['size']))
				$this->_out(sprintf('/MediaBox [0 0 %.2F %.2F]', $this->PageInfo[$n]['size'][0], $this->PageInfo[$n]['size'][1]));
			if(isset($this->PageInfo[$n]['rotation']))
				$this->_out('/Rotate '.$this->PageInfo[$n]['rotation']);
			$this->_out('/Resources 2 0 R');
			if(isset($this->PageInfo[$n]['annots']))
				$this->_out('/Annots ['.implode(' ', $this->PageInfo[$n]['annots']).']');
			$this->_out('/Contents '.($this->n+1).' 0 R>>');
			$this->_out('endobj');
			$p=($this->compress) ? gzcompress($this->pages[$n]) : $this->pages[$n];
			$this->_newobj();
			$this->_out('<< /Length '.strlen($p));
			if($this->compress)
				$this->_out('/Filter /FlateDecode');
			$this->_out('>>');
			$this->_putstream($p);
			$this->_out('endobj');
		}
		$this->offsets[1]=strlen($this->buffer);
		$this->_out('1 0 obj');
		$this->_out('<</Type /Pages');
		$kids='/Kids [';
		for($i=0;$i<$nb;$i++)
			$kids.=($i*2+3).' 0 R ';
		$this->_out($kids.']');
		$this->_out('/Count '.$nb);
		$w=$this->DefPageSize[0];
		$h=$this->DefPageSize[1];
		$this->_out(sprintf('/MediaBox [0 0 %.2F %.2F]',$w,$h));
		$this->_out('>>');
		$this->_out('endobj');
	}

	protected function _putresources()
	{
		$this->_putfonts();
		$this->_putimages();
		$this->offsets[2]=strlen($this->buffer);
		$this->_out('2 0 obj');
		$this->_out('<<');
		$this->_out('/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]');
		$this->_out('/Font <<');
		foreach($this->fonts as $font)
			$this->_out('/F'.$font['i'].' '.$font['n'].' 0 R');
		$this->_out('>>');
		if(count($this->images))
		{
			$this->_out('/XObject <<');
			foreach($this->images as $image)
				$this->_out('/I'.$image['i'].' '.$image['n'].' 0 R');
			$this->_out('>>');
		}
		$this->_out('>>');
		$this->_out('endobj');
	}

	protected function _putfonts()
	{
		foreach($this->fonts as $k => $font)
		{
			$this->_newobj();
			$this->fonts[$k]['n']=$this->n;
			$this->_out('<</Type /Font');
			$this->_out('/BaseFont /'.$font['name']);
			if($font['type']=='core')
			{
				$this->_out('/Subtype /Type1');
				if($font['name']!='Symbol' && $font['name']!='ZapfDingbats')
					$this->_out('/Encoding /WinAnsiEncoding');
			}
			else
			{
				$this->_out('/Subtype /Type1');
				$this->_out('/FirstChar 32');
				$this->_out('/LastChar 255');
				$this->_out('/Widths '.($this->n+1).' 0 R');
				$this->_out('/FontDescriptor '.($this->n+2).' 0 R');
				if($font['enc'])
				{
					if(isset($this->diffs[$font['enc']]))
						$this->_out('/Encoding '.$this->diffs[$font['enc']].' 0 R');
					else
						$this->_out('/Encoding /'.$font['enc']);
				}
			}
			$this->_out('>>');
			$this->_out('endobj');
			if($font['type']!='core')
			{
				$this->_newobj();
				$cw=&$font['cw'];
				$s='[';
				for($i=32;$i<=255;$i++)
					$s.=$cw[chr($i)].' ';
				$this->_out($s.']');
				$this->_out('endobj');
				$this->_newobj();
				$this->_out('<</Type /FontDescriptor');
				$this->_out('/FontName /'.$font['name']);
				$this->_out('/Flags '.$font['desc']['Flags']);
				$this->_out('/FontBBox ['.$font['desc']['FontBBox'].']');
				$this->_out('/ItalicAngle '.$font['desc']['ItalicAngle']);
				$this->_out('/Ascent '.$font['desc']['Ascent']);
				$this->_out('/Descent '.$font['desc']['Descent']);
				$this->_out('/CapHeight '.$font['desc']['CapHeight']);
				$this->_out('/StemV '.$font['desc']['StemV']);
				$this->_out('/FontFile '.($this->n+1).' 0 R');
				$this->_out('>>');
				$this->_out('endobj');
				$this->_newobj();
				$this->_out('<< /Length '.strlen($font['file']).'>>');
				$this->_putstream($font['file']);
				$this->_out('endobj');
			}
		}
	}

	protected function _putimages()
	{
		foreach($this->images as $file => $info)
		{
			$this->_newobj();
			$this->images[$file]['n']=$this->n;
			$this->_out('<</Type /XObject');
			$this->_out('/Subtype /Image');
			$this->_out('/Width '.$info['w']);
			$this->_out('/Height '.$info['h']);
			if($info['cs']=='Indexed')
				$this->_out('/ColorSpace [/Indexed /DeviceRGB '.(count($info['pal'])/3-1).' '.($this->n+1).' 0 R]');
			else
			{
				$this->_out('/ColorSpace /'.$info['cs']);
				if($info['cs']=='DeviceCMYK')
					$this->_out('/Decode [1 0 1 0 1 0 1 0]');
			}
			$this->_out('/BitsPerComponent '.$info['bpc']);
			if(isset($info['f']))
				$this->_out('/Filter /'.$info['f']);
			if(isset($info['dp']))
				$this->_out('/DecodeParms <<'.$info['dp'].'>>');
			if(isset($info['trns']) && is_array($info['trns']))
			{
				$trns='';
				for($i=0;$i<count($info['trns']);$i++)
					$trns.=$info['trns'][$i].' '.$info['trns'][$i].' ';
				$this->_out('/Mask ['.$trns.']');
			}
			$this->_out('/Length '.strlen($info['data']).'>>');
			$this->_putstream($info['data']);
			$this->_out('endobj');
			unset($this->images[$file]['data']);
			if($info['cs']=='Indexed')
			{
				$this->_newobj();
				$pal=pack('C*', ...$info['pal']);
				$this->_out('<< /Length '.strlen($pal).'>>');
				$this->_putstream($pal);
				$this->_out('endobj');
			}
		}
	}

	protected function _putinfo()
	{
		$this->_newobj();
		$this->_out('<<');
		$this->_out('/Producer '.$this->_textstring('FPDF '.FPDF_VERSION));
		if(!empty($this->title))
			$this->_out('/Title '.$this->_textstring($this->title));
		if(!empty($this->subject))
			$this->_out('/Subject '.$this->_textstring($this->subject));
		if(!empty($this->author))
			$this->_out('/Author '.$this->_textstring($this->author));
		if(!empty($this->keywords))
			$this->_out('/Keywords '.$this->_textstring($this->keywords));
		if(!empty($this->creator))
			$this->_out('/Creator '.$this->_textstring($this->creator));
		$this->_out('/CreationDate '.$this->_textstring('D:'.date('YmdHis')));
		$this->_out('>>');
		$this->_out('endobj');
	}

	protected function _putcatalog()
	{
		$this->_newobj();
		$this->_out('<< /Type /Catalog');
		$this->_out('/Pages 1 0 R');
		if($this->ZoomMode=='fullpage')
			$this->_out('/OpenAction [3 0 R /Fit]');
		elseif($this->ZoomMode=='fullwidth')
			$this->_out('/OpenAction [3 0 R /FitH null]');
		elseif($this->ZoomMode=='real')
			$this->_out('/OpenAction [3 0 R /XYZ null null 1]');
		elseif(!is_string($this->ZoomMode))
			$this->_out('/OpenAction [3 0 R /XYZ null null '.($this->ZoomMode/100).']');
		if($this->LayoutMode=='single')
			$this->_out('/PageLayout /SinglePage');
		elseif($this->LayoutMode=='continuous')
			$this->_out('/PageLayout /OneColumn');
		elseif($this->LayoutMode=='two')
			$this->_out('/PageLayout /TwoColumnLeft');
		$this->_out('>>');
		$this->_out('endobj');
	}

	protected function _puttrailer()
	{
		$this->_out('trailer');
		$this->_out('<<');
		$this->_out('/Size '.($this->n+1));
		$this->_out('/Root '.$this->n.' 0 R');
		$this->_out('/Info '.($this->n-1).' 0 R');
		$this->_out('>>');
		$this->_out('startxref');
		$this->_out($this->offsets[$this->n]);
		$this->_out('%%EOF');
	}

	protected function _endofdoc()
	{
		$this->state=3;
	}

	protected function _newobj()
	{
		$this->n++;
		$this->offsets[$this->n]=strlen($this->buffer);
		$this->_out($this->n.' 0 obj');
	}

	protected function _out($s)
	{
		if($this->state==2)
			$this->pages[$this->page].=$s."\n";
		else
			$this->buffer.=$s."\n";
	}

	protected function _putstream($s)
	{
		$this->_out('stream');
		$this->_out($s);
		$this->_out('endstream');
	}

	protected function _textstring($s)
	{
		return '('.$this->_escape($s).')';
	}

	protected function _escape($s)
	{
		$s=str_replace('\\','\\\\',$s);
		$s=str_replace('(','\\(',$s);
		$s=str_replace(')','\\)',$s);
		$s=preg_replace("/\r/", "\\r", $s);
		return $s;
	}

	protected function _dounderline($x, $y, $txt)
	{
		$up=$this->CurrentFont['up'];
		$ut=$this->CurrentFont['ut'];
		$w=$this->GetStringWidth($txt)+$this->ws*substr_count($txt,' ');
		return sprintf('%.2F %.2F %.2F %.2F re f',$x*$this->k,($this->h-($y-$up/1000*$this->FontSize))*$this->k,$w*$this->k,-$ut/1000*$this->FontSizePt);
	}

	protected function _parseimage($file)
	{
		$info=getimagesize($file);
		if(!$info)
			return '';
		if($info[2]==IMAGETYPE_JPEG)
			return $this->_parsejpg($file);
		if($info[2]==IMAGETYPE_PNG)
			return $this->_parsepng($file);
		return '';
	}

	protected function _parsejpg($file)
	{
		$a=getimagesize($file);
		if(!$a)
			$this->Error('Missing or incorrect image file: '.$file);
		if($a[2]!=2)
			$this->Error('Not a JPEG file: '.$file);
		$info=array('w'=>$a[0], 'h'=>$a[1], 'cs'=>'DeviceRGB', 'bpc'=>8, 'f'=>'DCTDecode');
		$info['data']=file_get_contents($file);
		return $info;
	}

	protected function _parsepng($file)
	{
		$f=fopen($file,'rb');
		if(!$f)
			$this->Error('Can\'t open image file: '.$file);
		$info=array();
		$this->_readstream($f,8);
		$this->_readstream($f,4);
		if($this->_readstream($f,4)!='IHDR')
			$this->Error('Incorrect PNG file: '.$file);
		$w=$this->_readint($f);
		$h=$this->_readint($f);
		$bpc=ord($this->_readstream($f,1));
		if($bpc>8)
			$this->Error('16-bit depth not supported: '.$file);
		$ct=ord($this->_readstream($f,1));
		if($ct==0)
			$colspace='DeviceGray';
		elseif($ct==2)
			$colspace='DeviceRGB';
		elseif($ct==3)
			$colspace='Indexed';
		else
			$this->Error('Alpha channel not supported: '.$file);
		$this->_readstream($f,2);
		$this->_readstream($f,1);
		$this->_readstream($f,1);
		$this->_readstream($f,4);
		$this->_readstream($f,4);
		$pal='';
		$trns='';
		$data='';
		do
		{
			$n=$this->_readint($f);
			$type=$this->_readstream($f,4);
			if($type=='PLTE')
				$pal=$this->_readstream($f,$n);
			elseif($type=='tRNS')
				$trns=$this->_readstream($f,$n);
			elseif($type=='IDAT')
				$data.=$this->_readstream($f,$n);
			else
				$this->_readstream($f,$n);
			$this->_readstream($f,4);
		}
		while($type!='IEND');
		fclose($f);
		if($ct==3)
		{
			$info['pal']=array_values(unpack('C*',$pal));
			$info['cs']='Indexed';
		}
		else
			$info['cs']=$colspace;
		$info['w']=$w;
		$info['h']=$h;
		$info['bpc']=$bpc;
		$info['f']='FlateDecode';
		$channels=($ct==2 ? 3 : 1);
		$rowBytes=(int)ceil(($w*$channels*$bpc)/8);
		$expectedSize=($rowBytes+1)*$h;
		$maxDecodedSize=50*1024*1024;
		if($expectedSize>$maxDecodedSize)
			$this->Error('PNG çok büyük, lütfen küçültülmüş/kompres edilmiş sürümünü yükleyin');
		$gzuncompressParams=(new ReflectionFunction('gzuncompress'))->getNumberOfParameters();
		if($gzuncompressParams>=2)
			$info['data']=gzuncompress($data,$expectedSize);
		else
			$info['data']=gzuncompress($data);
		if($info['data']===false)
			$info['data']=$data;
		return $info;
	}

	protected function _readstream($f, $n)
	{
		$res='';
		while($n>0 && !feof($f))
		{
			$chunk=fread($f,$n);
			if($chunk===false)
				$this->Error('Error while reading stream');
			$n-=strlen($chunk);
			$res.=$chunk;
		}
		return $res;
	}

	protected function _readint($f)
	{
		$a=unpack('N', $this->_readstream($f,4));
		return $a[1];
	}

	protected function _getfontwidths($fontkey)
	{
		return array_fill(0, 256, 600);
	}
}
