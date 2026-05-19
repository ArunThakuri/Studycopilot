import svgPaths from "./svg-4qjkbki6k8";

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
        <p className="absolute font-['Figtree:Regular',sans-serif] leading-[32px] left-0 not-italic text-[24px] text-neutral-950 top-[0.5px] w-[622px]">Exercises - Scientific Learning: Observation to Conclusion</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[36px] relative shrink-0 w-[663.133px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[36px] items-center relative w-[663.133px]">
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

function Strong() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[348.57px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">1. Fill in the blanks with suitable words given below:</p>
    </div>
  );
}

function P() {
  return (
    <div className="absolute h-[51px] left-0 top-0 w-[766px]" data-name="p">
      <Strong />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[715px]">continuous principle demonstrate precautions pattern paragraph</p>
    </div>
  );
}

function Strong1() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[11.352px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">a.</p>
    </div>
  );
}

function P1() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[67px] w-[766px]" data-name="p">
      <Strong1 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[11.35px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">Practical work helps to clarify the learnt ________.</p>
    </div>
  );
}

function Strong2() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[55.898px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer:</p>
    </div>
  );
}

function P2() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[108.5px] w-[766px]" data-name="p">
      <Strong2 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[55.9px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">principle</p>
    </div>
  );
}

function Strong3() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[12.367px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">b.</p>
    </div>
  );
}

function P3() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[150px] w-[766px]" data-name="p">
      <Strong3 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[12.37px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">To prevent probable accident in laboratories we should follow ________.</p>
    </div>
  );
}

function Strong4() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[55.898px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Answer:</p>
    </div>
  );
}

function P4() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[191.5px] w-[766px]" data-name="p">
      <Strong4 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[55.9px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">precautions</p>
    </div>
  );
}

function Hr() {
  return (
    <div className="absolute h-[2px] left-0 top-[249px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Strong5() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[286.5px] w-[230.109px]" data-name="strong">
      <p className="font-['Figtree:SemiBold','Noto_Sans_Math:Regular',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">2. Tick (√) the correct alternative:</p>
    </div>
  );
}

function Strong6() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[11.352px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">a.</p>
    </div>
  );
}

function P5() {
  return (
    <div className="absolute h-[102px] left-0 top-[324.5px] w-[766px]" data-name="p">
      <Strong6 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[11.35px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">How does scientific learning process related with an object or event begin? i. by doing practical work</p>
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] text-nowrap top-[25px] whitespace-pre">ii. by analyzing the objects or events</p>
      <p className="absolute font-['Figtree:Regular','Noto_Sans:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] text-nowrap top-[50.5px] whitespace-pre">iii. by curiosity raised by seeing the objects or events (√)</p>
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] text-nowrap top-[76px] whitespace-pre">iv. by collecting data related with the objects or events</p>
    </div>
  );
}

function Strong7() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[12.367px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">b.</p>
    </div>
  );
}

function P6() {
  return (
    <div className="absolute h-[127.5px] left-0 top-[442.5px] w-[766px]" data-name="p">
      <Strong7 />
      <p className="absolute font-['Figtree:Regular','Noto_Sans:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[744px]">Which of following is the practical work done in a laboratory? i. to separate salt crystals from the salt solution (√)</p>
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] text-nowrap top-[50.5px] whitespace-pre">ii. to identify natural resources by field visit</p>
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] text-nowrap top-[76px] whitespace-pre">iii. to know the function of parts of a flower by observing them</p>
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] text-nowrap top-[101.5px] whitespace-pre">iv. to produce static electricity by rubbing a comb on hair</p>
    </div>
  );
}

function Hr1() {
  return (
    <div className="absolute h-[2px] left-0 top-[602px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Strong8() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[639.5px] w-[234.305px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">3. Answer the following questions:</p>
    </div>
  );
}

function Strong9() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[11.352px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">a.</p>
    </div>
  );
}

function P7() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[677.5px] w-[766px]" data-name="p">
      <Strong9 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[11.35px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">What is scientific learning?</p>
    </div>
  );
}

function P8() {
  return (
    <div className="absolute h-[51px] left-0 top-[719px] w-[766px]" data-name="p">
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[747px]">Scientific learning is the systematic study to find the answer to questions (what, why, and how) that arise in our minds after observing objects or events around us.</p>
    </div>
  );
}

function Strong10() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[12.367px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">b.</p>
    </div>
  );
}

function P9() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[786px] w-[766px]" data-name="p">
      <Strong10 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[12.37px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">How does the scientific learning begin after seeing objects or events around us? Clarify with example.</p>
    </div>
  );
}

function P10() {
  return (
    <div className="absolute h-[51px] left-0 top-[827.5px] w-[766px]" data-name="p">
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[758px]">Scientific learning begins with the curiosity that develops after observing an object or event. Questions like what, why, and how are raised in our mind.</p>
    </div>
  );
}

function Strong11() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[62.141px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">Example:</p>
    </div>
  );
}

function P11() {
  return (
    <div className="absolute h-[51px] left-0 top-[894.5px] w-[766px]" data-name="p">
      <Strong11 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-0 not-italic text-[#364153] text-[15px] top-[-0.5px] w-[755px]">{`Observing an alarm clock waking us up can lead to questions like: "How is sound produced by the alarm clock?", "How does the sound reach our ears?", and "How can we hear the sound?"`}</p>
    </div>
  );
}

function Hr2() {
  return (
    <div className="absolute h-[2px] left-0 top-[977.5px] w-[766px]" data-name="hr">
      <div aria-hidden="true" className="absolute border-[2px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Strong12() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[1015px] w-[108.312px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">4. Differentiate:</p>
    </div>
  );
}

function Strong13() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[3.5px] w-[11.352px]" data-name="strong">
      <p className="font-['Figtree:SemiBold',sans-serif] leading-[25.5px] not-italic relative shrink-0 text-[15px] text-neutral-950 text-nowrap whitespace-pre">a.</p>
    </div>
  );
}

function P12() {
  return (
    <div className="absolute h-[25.5px] left-0 top-[1053px] w-[766px]" data-name="p">
      <Strong13 />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[25.5px] left-[11.35px] not-italic text-[#364153] text-[15px] text-nowrap top-[-0.5px] whitespace-pre">Practical work and model</p>
    </div>
  );
}

function Th() {
  return (
    <div className="absolute h-[47.797px] left-0 top-0 w-[93.695px]" data-name="th">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[23.8px] left-[16px] not-italic text-[#59168b] text-[14px] text-nowrap top-[11px] whitespace-pre">Feature</p>
    </div>
  );
}

function Th1() {
  return (
    <div className="absolute h-[47.797px] left-[93.69px] top-0 w-[325.516px]" data-name="th">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[23.8px] left-[16.5px] not-italic text-[#59168b] text-[14px] text-nowrap top-[11px] whitespace-pre">Practical Work</p>
    </div>
  );
}

function Th2() {
  return (
    <div className="absolute h-[47.797px] left-[419.21px] top-0 w-[344.789px]" data-name="th">
      <p className="absolute font-['Figtree:SemiBold',sans-serif] leading-[23.8px] left-[16.5px] not-italic text-[#59168b] text-[14px] text-nowrap top-[11px] whitespace-pre">Model</p>
    </div>
  );
}

function Tr() {
  return (
    <div className="absolute h-[47.797px] left-0 top-0 w-[764px]" data-name="tr">
      <Th />
      <Th1 />
      <Th2 />
    </div>
  );
}

function Thead() {
  return (
    <div className="absolute bg-purple-100 h-[47.797px] left-0 top-0 w-[764px]" data-name="thead">
      <Tr />
    </div>
  );
}

function Td() {
  return (
    <div className="absolute h-[95.891px] left-0 top-0 w-[93.695px]" data-name="td">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[23.8px] left-[16px] not-italic text-[#364153] text-[14px] text-nowrap top-[34.8px] whitespace-pre">Definition</p>
    </div>
  );
}

function Td1() {
  return (
    <div className="absolute h-[95.891px] left-[93.69px] top-0 w-[325.516px]" data-name="td">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[23.8px] left-[16.5px] not-italic text-[#364153] text-[14px] top-[11px] w-[290px]">Work done inside or outside a laboratory related to a definite subject matter to test any principle or fact.</p>
    </div>
  );
}

function Td2() {
  return (
    <div className="absolute h-[95.891px] left-[419.21px] top-0 w-[344.789px]" data-name="td">
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[23.8px] left-[16.5px] not-italic text-[#364153] text-[14px] top-[11px] w-[288px]">A sample constructed to represent scientific processes, methods, materials, organs, natural resources, etc.</p>
    </div>
  );
}

function Tr1() {
  return (
    <div className="absolute h-[95.891px] left-0 top-0 w-[764px]" data-name="tr">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Td />
      <Td1 />
      <Td2 />
    </div>
  );
}

function Td3() {
  return (
    <div className="absolute h-[72.594px] left-0 top-0 w-[93.695px]" data-name="td">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[23.8px] left-[16px] not-italic text-[#364153] text-[14px] text-nowrap top-[23.4px] whitespace-pre">Purpose</p>
    </div>
  );
}

function Td4() {
  return (
    <div className="absolute h-[72.594px] left-[93.69px] top-0 w-[325.516px]" data-name="td">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[23.8px] left-[16.5px] not-italic text-[#364153] text-[14px] text-nowrap top-[23.4px] whitespace-pre">To test a principle or fact and gather data.</p>
    </div>
  );
}

function Td5() {
  return (
    <div className="absolute h-[72.594px] left-[419.21px] top-0 w-[344.789px]" data-name="td">
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[23.8px] left-[16.5px] not-italic text-[#364153] text-[14px] top-[11.5px] w-[294px]">To demonstrate or study the parts or principles which are not visible directly.</p>
    </div>
  );
}

function Tr2() {
  return (
    <div className="absolute h-[72.594px] left-0 top-[95.89px] w-[764px]" data-name="tr">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Td3 />
      <Td4 />
      <Td5 />
    </div>
  );
}

function Td6() {
  return (
    <div className="absolute h-[72.094px] left-0 top-0 w-[93.695px]" data-name="td">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[23.8px] left-[16px] not-italic text-[#364153] text-[14px] text-nowrap top-[23.4px] whitespace-pre">Examples</p>
    </div>
  );
}

function Td7() {
  return (
    <div className="absolute h-[72.094px] left-[93.69px] top-0 w-[325.516px]" data-name="td">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[23.8px] left-[16.5px] not-italic text-[#364153] text-[14px] top-[11.5px] w-[246px]">Observing, Testing, Distillation process, Observation of volume of air.</p>
    </div>
  );
}

function Td8() {
  return (
    <div className="absolute h-[72.094px] left-[419.21px] top-0 w-[344.789px]" data-name="td">
      <p className="absolute font-['Figtree:Regular',sans-serif] leading-[23.8px] left-[16.5px] not-italic text-[#364153] text-[14px] top-[11.5px] w-[292px]">Collage model of photosynthesis, Globe of the earth, Model of human breathing.</p>
    </div>
  );
}

function Tr3() {
  return (
    <div className="absolute h-[72.094px] left-0 top-[168.48px] w-[764px]" data-name="tr">
      <Td6 />
      <Td7 />
      <Td8 />
    </div>
  );
}

function Tbody() {
  return (
    <div className="absolute bg-white h-[240.578px] left-0 top-[47.8px] w-[764px]" data-name="tbody">
      <Tr1 />
      <Tr2 />
      <Tr3 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[288.375px] relative shrink-0 w-full" data-name="Table">
      <Thead />
      <Tbody />
    </div>
  );
}

function Table1() {
  return (
    <div className="absolute h-[290.375px] left-0 rounded-[10px] top-[1102.5px] w-[766px]" data-name="table">
      <div className="box-border content-stretch flex flex-col h-[290.375px] items-start overflow-clip p-px relative rounded-[inherit] w-[766px]">
        <Table />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[1392.88px] relative shrink-0 w-full" data-name="Container">
      <P />
      <P1 />
      <P2 />
      <P3 />
      <P4 />
      <Hr />
      <Strong5 />
      <P5 />
      <P6 />
      <Hr1 />
      <Strong8 />
      <P7 />
      <P8 />
      <P9 />
      <P10 />
      <P11 />
      <Hr2 />
      <Strong12 />
      <P12 />
      <Table1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[1482.88px] items-start left-[32px] pb-px pt-[33px] px-[33px] rounded-[10px] top-[136px] w-[832px]" data-name="Container">
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
    <div className="absolute content-stretch flex h-[36px] items-center justify-between left-[32px] top-[1642.88px] w-[832px]" data-name="Container">
      <Button4 />
      <Button5 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="absolute h-[1710.88px] left-[102.5px] top-[73px] w-[896px]" data-name="Main Content">
      <Button2 />
      <Container4 />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Exercises() {
  return (
    <div className="bg-gray-50 h-[1783.88px] relative shrink-0 w-full" data-name="Exercises">
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