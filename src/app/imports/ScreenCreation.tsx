import svgPaths from "./svg-z1i27ep0xe";

function Icon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/2 right-1/2 top-[29.17%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 14">
            <path d="M0.833333 0.833333V12.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 17">
            <path d={svgPaths.p1577d880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#9810fa] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[6px] px-[6px] relative size-[32px]">
        <Icon />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Figtree:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[-0.5px] whitespace-pre">StudyCopilot</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[135.391px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[32px] items-center relative w-[135.391px]">
        <Container />
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[14px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[14px]">
        <p className="absolute font-['Figtree:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[-0.5px] whitespace-pre">🏠</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Figtree:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[-0.5px] whitespace-pre">Dashboard</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[20px] items-center left-0 top-[10px] w-[85.492px]" data-name="Button">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[20px] left-[157.49px] top-[10px] w-[59.789px]" data-name="Text">
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[-0.5px] whitespace-pre">John Doe</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[20px] left-[233.28px] top-[10px] w-[62.281px]" data-name="Button">
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#e7000b] text-[14px] text-nowrap top-[-0.5px] whitespace-pre">🚪 Logout</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 bg-[#9810fa] grow h-[40px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[40px] items-center justify-center relative w-full">
        <p className="font-['Figtree:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">JD</p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute content-stretch flex items-start left-[101.49px] overflow-clip rounded-[1.67772e+07px] size-[40px] top-0" data-name="Primitive.span">
      <Text4 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[40px] relative shrink-0 w-[295.562px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[40px] relative w-[295.562px]">
        <Button />
        <Text3 />
        <Button1 />
        <PrimitiveSpan />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[73px] items-start left-0 pb-px pt-[16px] px-[32px] top-0 w-[1101px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container3 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Figtree:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[-0.5px] whitespace-pre">Back to Unit Dashboard</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[20px] items-center left-[32px] top-[32px] w-[171.516px]" data-name="Button">
      <Icon1 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[36px] relative shrink-0 w-[30px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-start relative w-[30px]">
        <p className="font-['Figtree:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[30px] text-neutral-950 text-nowrap whitespace-pre">📚</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <p className="absolute font-['Figtree:Regular',sans-serif] leading-[32px] left-0 not-italic text-[24px] text-neutral-950 top-[0.5px] w-[168px]">Exercises - Test</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[36px] relative shrink-0 w-[209.695px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[36px] items-center relative w-[209.695px]">
        <Text6 />
        <Text7 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[13px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19987d80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14 2V5.33333H10.6667" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2a3e9c80} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 10.6667H2V14" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[122.492px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[122.492px]">
        <Icon2 />
        <p className="absolute font-['Figtree:Medium',sans-serif] leading-[20px] left-[37px] not-italic text-[14px] text-neutral-950 text-nowrap top-[7.5px] whitespace-pre">Regenerate</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center justify-between left-[32px] top-[76px] w-[832px]" data-name="Container">
      <Heading1 />
      <Button3 />
    </div>
  );
}

function H2() {
  return (
    <div className="absolute h-[41px] left-0 top-0 w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 1: Short Answer Questions</p>
    </div>
  );
}

function Strong() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[57px] w-[766px]" data-name="p">
      <Strong />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: What is the first step in the scientific learning process?</p>
    </div>
  );
}

function Strong1() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P1() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[98.5px] w-[766px]" data-name="p">
      <Strong1 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[51.67px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: To study the objects or events around us.</p>
    </div>
  );
}

function Strong2() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P2() {
  return (
    <div className="absolute h-[51px] left-0 top-[140px] w-[766px]" data-name="p">
      <Strong2 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[763px]">: The scientific learning process begins with observing the world around us, which then leads to questions and further investigation.</p>
    </div>
  );
}

function Hr() {
  return (
    <div className="absolute h-[2px] left-0 top-[223px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H3() {
  return (
    <div className="absolute h-[41px] left-0 top-[257px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 2: Short Answer Questions</p>
    </div>
  );
}

function Strong3() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P3() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[314px] w-[766px]" data-name="p">
      <Strong3 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: Give two examples of practical works.</p>
    </div>
  );
}

function Strong4() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P4() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[355.5px] w-[766px]" data-name="p">
      <Strong4 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[51.67px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: Observing and testing.</p>
    </div>
  );
}

function Strong5() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P5() {
  return (
    <div className="absolute h-[51px] left-0 top-[397px] w-[766px]" data-name="p">
      <Strong5 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[732px]">: Practical works involve hands-on activities, and observing and testing are two fundamental forms of such activities in science.</p>
    </div>
  );
}

function Hr1() {
  return (
    <div className="absolute h-[2px] left-0 top-[480px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H4() {
  return (
    <div className="absolute h-[41px] left-0 top-[514px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 3: Short Answer Questions</p>
    </div>
  );
}

function Strong6() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P6() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[571px] w-[766px]" data-name="p">
      <Strong6 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: What is a report in the context of practical work?</p>
    </div>
  );
}

function Strong7() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P7() {
  return (
    <div className="absolute h-[51px] left-0 top-[612.5px] w-[766px]" data-name="p">
      <Strong7 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[757px]">: The detailed description of objective, materials required, method/procedure, result, conclusion etc. after doing a practical work is called report.</p>
    </div>
  );
}

function Strong8() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P8() {
  return (
    <div className="absolute h-[51px] left-0 top-[679.5px] w-[766px]" data-name="p">
      <Strong8 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[761px]">: A report is a comprehensive documentation of a practical work, outlining its purpose, methods, findings, and conclusions.</p>
    </div>
  );
}

function Hr2() {
  return (
    <div className="absolute h-[2px] left-0 top-[762.5px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H5() {
  return (
    <div className="absolute h-[41px] left-0 top-[796.5px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 4: Short Answer Questions</p>
    </div>
  );
}

function Strong9() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P9() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[853.5px] w-[766px]" data-name="p">
      <Strong9 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: State one reason why we write a report.</p>
    </div>
  );
}

function Strong10() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P10() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[895px] w-[766px]" data-name="p">
      <Strong10 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[51.67px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: To submit the details of the practical work.</p>
    </div>
  );
}

function Strong11() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P11() {
  return (
    <div className="absolute h-[51px] left-0 top-[936.5px] w-[766px]" data-name="p">
      <Strong11 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[735px]">: Reports serve as a record of the work done and are often required for assessment or documentation purposes.</p>
    </div>
  );
}

function Hr3() {
  return (
    <div className="absolute h-[2px] left-0 top-[1019.5px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H6() {
  return (
    <div className="absolute h-[41px] left-0 top-[1053.5px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 5: Fill in the Blanks</p>
    </div>
  );
}

function Strong12() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P12() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[1110.5px] w-[766px]" data-name="p">
      <Strong12 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: The title indicates the type of ________ work.</p>
    </div>
  );
}

function Strong13() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P13() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[1152px] w-[766px]" data-name="p">
      <Strong13 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[51.67px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: practical</p>
    </div>
  );
}

function Strong14() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P14() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[1193.5px] w-[766px]" data-name="p">
      <Strong14 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[56.68px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: The title of a report should clearly reflect the nature of the practical work that was conducted.</p>
    </div>
  );
}

function Hr4() {
  return (
    <div className="absolute h-[2px] left-0 top-[1251px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H7() {
  return (
    <div className="absolute h-[41px] left-0 top-[1285px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 6: Fill in the Blanks</p>
    </div>
  );
}

function Strong15() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P15() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[1342px] w-[766px]" data-name="p">
      <Strong15 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: Method or procedure is written in ________ tense.</p>
    </div>
  );
}

function Strong16() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P16() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[1383.5px] w-[766px]" data-name="p">
      <Strong16 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[51.67px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: past perfect</p>
    </div>
  );
}

function Strong17() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P17() {
  return (
    <div className="absolute h-[51px] left-0 top-[1425px] w-[766px]" data-name="p">
      <Strong17 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[745px]">: The procedure section describes actions that have already been completed, so it is written in the past perfect tense.</p>
    </div>
  );
}

function Hr5() {
  return (
    <div className="absolute h-[2px] left-0 top-[1508px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H8() {
  return (
    <div className="absolute h-[41px] left-0 top-[1542px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 7: Fill in the Blanks</p>
    </div>
  );
}

function Strong18() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P18() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[1599px] w-[766px]" data-name="p">
      <Strong18 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: On the basis of the result of the experiment, we obtain ________ of the practical work.</p>
    </div>
  );
}

function Strong19() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P19() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[1640.5px] w-[766px]" data-name="p">
      <Strong19 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[51.67px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: conclusion</p>
    </div>
  );
}

function Strong20() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P20() {
  return (
    <div className="absolute h-[51px] left-0 top-[1682px] w-[766px]" data-name="p">
      <Strong20 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[744px]">: The conclusion is derived from the results obtained during the experiment and summarizes the overall findings.</p>
    </div>
  );
}

function Hr6() {
  return (
    <div className="absolute h-[2px] left-0 top-[1765px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H9() {
  return (
    <div className="absolute h-[41px] left-0 top-[1799px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 8: Short Answer Questions</p>
    </div>
  );
}

function Strong21() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P21() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[1856px] w-[766px]" data-name="p">
      <Strong21 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: What is the objective of Sample report 1?</p>
    </div>
  );
}

function Strong22() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P22() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[1897.5px] w-[766px]" data-name="p">
      <Strong22 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[51.67px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: To test whether air has a definite volume or not.</p>
    </div>
  );
}

function Strong23() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P23() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[1939px] w-[766px]" data-name="p">
      <Strong23 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[56.68px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: The stated objective clearly defines the purpose of the experiment described in the report.</p>
    </div>
  );
}

function Hr7() {
  return (
    <div className="absolute h-[2px] left-0 top-[1996.5px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H10() {
  return (
    <div className="absolute h-[41px] left-0 top-[2030.5px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 9: Short Answer Questions</p>
    </div>
  );
}

function Strong24() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P24() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[2087.5px] w-[766px]" data-name="p">
      <Strong24 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: What materials were required for Sample report 2?</p>
    </div>
  );
}

function Strong25() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P25() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[2129px] w-[766px]" data-name="p">
      <Strong25 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[51.67px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: Match box, lighter, candle, glass tumbler, bowl, water.</p>
    </div>
  );
}

function Strong26() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P26() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[2170.5px] w-[766px]" data-name="p">
      <Strong26 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[56.68px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">{`: These are the materials listed in the "Required materials" section of Sample Report 2.`}</p>
    </div>
  );
}

function Hr8() {
  return (
    <div className="absolute h-[2px] left-0 top-[2228px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H11() {
  return (
    <div className="absolute h-[41px] left-0 top-[2262px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 10: Short Answer Questions</p>
    </div>
  );
}

function Strong27() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P27() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[2319px] w-[766px]" data-name="p">
      <Strong27 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: What was the result of Sample report 2?</p>
    </div>
  );
}

function Strong28() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P28() {
  return (
    <div className="absolute h-[76.5px] left-0 top-[2360.5px] w-[766px]" data-name="p">
      <Strong28 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[757px]">: The oxygen present in air supports to glow the candle. After a moment, when all the oxygen inside the glass tumbler finishes, the candle extinguishes. Then, water raised in the glass tumbler as shown by the volume of the amount of oxygen.</p>
    </div>
  );
}

function Strong29() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P29() {
  return (
    <div className="absolute h-[51px] left-0 top-[2453px] w-[766px]" data-name="p">
      <Strong29 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[746px]">: The result section describes the observed outcome of the experiment, which in this case is the candle extinguishing due to lack of oxygen.</p>
    </div>
  );
}

function Hr9() {
  return (
    <div className="absolute h-[2px] left-0 top-[2536px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H12() {
  return (
    <div className="absolute h-[41px] left-0 top-[2570px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 11: Short Answer Questions</p>
    </div>
  );
}

function Strong30() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P30() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[2627px] w-[766px]" data-name="p">
      <Strong30 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: What materials were required for Sample report 3?</p>
    </div>
  );
}

function Strong31() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P31() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[2668.5px] w-[766px]" data-name="p">
      <Strong31 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[51.67px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: Round bottom flask, cork, conical flask, tripod stand, retort stand, burner, condenser, wire gauze.</p>
    </div>
  );
}

function Strong32() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P32() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[2710px] w-[766px]" data-name="p">
      <Strong32 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[56.68px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">{`: These are the materials listed in the "Required materials" section of Sample Report 3.`}</p>
    </div>
  );
}

function Hr10() {
  return (
    <div className="absolute h-[2px] left-0 top-[2767.5px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H13() {
  return (
    <div className="absolute h-[41px] left-0 top-[2801.5px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 12: Short Answer Questions</p>
    </div>
  );
}

function Strong33() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P33() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[2858.5px] w-[766px]" data-name="p">
      <Strong33 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: What is the objective of the model construction report?</p>
    </div>
  );
}

function Strong34() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P34() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[2900px] w-[766px]" data-name="p">
      <Strong34 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[51.67px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: To demonstrate human breathing by constructing a model.</p>
    </div>
  );
}

function Strong35() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P35() {
  return (
    <div className="absolute h-[51px] left-0 top-[2941.5px] w-[766px]" data-name="p">
      <Strong35 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[720px]">: The objective clearly states the purpose of building the model, which is to illustrate the process of human breathing.</p>
    </div>
  );
}

function Hr11() {
  return (
    <div className="absolute h-[2px] left-0 top-[3024.5px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H14() {
  return (
    <div className="absolute h-[41px] left-0 top-[3058.5px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 13: Short Answer Questions</p>
    </div>
  );
}

function Strong36() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P36() {
  return (
    <div className="absolute h-[51px] left-0 top-[3115.5px] w-[766px]" data-name="p">
      <Strong36 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[675px]">: What happens to the small balloons when the knot of the big balloon is pulled in the model construction?</p>
    </div>
  );
}

function Strong37() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P37() {
  return (
    <div className="absolute h-[51px] left-0 top-[3182.5px] w-[766px]" data-name="p">
      <Strong37 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[717px]">: When the knot of the big balloon was pulled, the size of the small balloons fixed to base connector increased.</p>
    </div>
  );
}

function Strong38() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P38() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[3249.5px] w-[766px]" data-name="p">
      <Strong38 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[56.68px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: This observation mimics the expansion of the lungs during inhalation.</p>
    </div>
  );
}

function Hr12() {
  return (
    <div className="absolute h-[2px] left-0 top-[3307px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H15() {
  return (
    <div className="absolute h-[41px] left-0 top-[3341px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 14: Short Answer Questions</p>
    </div>
  );
}

function Strong39() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P39() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[3398px] w-[766px]" data-name="p">
      <Strong39 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: What is the role of the diaphragm in human breathing?</p>
    </div>
  );
}

function Strong40() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P40() {
  return (
    <div className="absolute h-[51px] left-0 top-[3439.5px] w-[766px]" data-name="p">
      <Strong40 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[739px]">: The lungs are made expanded and contracted by the diaphragm. Diaphragm is a strong muscular layer that separates thorax and abdomen.</p>
    </div>
  );
}

function Strong41() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P41() {
  return (
    <div className="absolute h-[51px] left-0 top-[3506.5px] w-[766px]" data-name="p">
      <Strong41 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[728px]">: The diaphragm is a key muscle involved in breathing, responsible for expanding and contracting the chest cavity.</p>
    </div>
  );
}

function Hr13() {
  return (
    <div className="absolute h-[2px] left-0 top-[3589.5px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function H16() {
  return (
    <div className="absolute h-[41px] left-0 top-[3623.5px] w-[766px]" data-name="h2">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[32px] left-0 not-italic text-[#101828] text-[24px] text-nowrap top-[0.5px] whitespace-pre">Exercise 15: Short Answer Questions</p>
    </div>
  );
}

function Strong42() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.313px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Question</p>
    </div>
  );
}

function P42() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[3680.5px] w-[766px]" data-name="p">
      <Strong42 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[62.31px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">: Why is model construction an important task of scientific learning?</p>
    </div>
  );
}

function Strong43() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[51.672px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer</p>
    </div>
  );
}

function P43() {
  return (
    <div className="absolute h-[51px] left-0 top-[3722px] w-[766px]" data-name="p">
      <Strong43 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[754px]">: A model helps to clear the principles and facts of science. Thus, model construction is an important task of scientific learning.</p>
    </div>
  );
}

function Strong44() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[56.68px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Solution</p>
    </div>
  );
}

function P44() {
  return (
    <div className="absolute h-[51px] left-0 top-[3789px] w-[766px]" data-name="p">
      <Strong44 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[739px]">: Models provide a tangible way to understand and visualize scientific concepts, making them valuable learning tools.</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[3840px] relative shrink-0 w-full" data-name="Container">
      <H2 />
      <P />
      <P1 />
      <P2 />
      <Hr />
      <H3 />
      <P3 />
      <P4 />
      <P5 />
      <Hr1 />
      <H4 />
      <P6 />
      <P7 />
      <P8 />
      <Hr2 />
      <H5 />
      <P9 />
      <P10 />
      <P11 />
      <Hr3 />
      <H6 />
      <P12 />
      <P13 />
      <P14 />
      <Hr4 />
      <H7 />
      <P15 />
      <P16 />
      <P17 />
      <Hr5 />
      <H8 />
      <P18 />
      <P19 />
      <P20 />
      <Hr6 />
      <H9 />
      <P21 />
      <P22 />
      <P23 />
      <Hr7 />
      <H10 />
      <P24 />
      <P25 />
      <P26 />
      <Hr8 />
      <H11 />
      <P27 />
      <P28 />
      <P29 />
      <Hr9 />
      <H12 />
      <P30 />
      <P31 />
      <P32 />
      <Hr10 />
      <H13 />
      <P33 />
      <P34 />
      <P35 />
      <Hr11 />
      <H14 />
      <P36 />
      <P37 />
      <P38 />
      <Hr12 />
      <H15 />
      <P39 />
      <P40 />
      <P41 />
      <Hr13 />
      <H16 />
      <P42 />
      <P43 />
      <P44 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[3954px] items-start left-[32px] pb-px pt-[65px] px-[33px] rounded-[10px] top-[136px] w-[832px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container5 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[13px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[169.68px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[169.68px]">
        <Icon3 />
        <p className="absolute font-['Figtree:Medium',sans-serif] leading-[20px] left-[37px] not-italic text-[14px] text-neutral-950 text-nowrap top-[7.5px] whitespace-pre">Previous: Summary</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[156.88px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#9810fa] h-[36px] relative rounded-[8px] shrink-0 w-[184.875px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[184.875px]">
        <p className="absolute font-['Figtree:Medium',sans-serif] leading-[20px] left-[12px] not-italic text-[14px] text-nowrap text-white top-[7.5px] whitespace-pre">Next: Interactive Quiz</p>
        <Icon4 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center justify-between left-[32px] top-[4114px] w-[832px]" data-name="Container">
      <Button4 />
      <Button5 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="absolute h-[4182px] left-[102.5px] top-[73px] w-[896px]" data-name="Main Content">
      <Button2 />
      <Container4 />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Exercises() {
  return (
    <div className="bg-gray-50 h-[4255px] relative shrink-0 w-full" data-name="Exercises">
      <Header />
      <MainContent />
    </div>
  );
}

export default function ScreenCreation() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Screen Creation">
      <Exercises />
    </div>
  );
}