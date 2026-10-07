import React from 'react';

export default function CompareScreen() {
  return (
    <>
      <div className="flex flex-col w-full">

<div className="w-full bg-surface-card shadow-sm select-none">

<div className="w-full h-8 px-space-md bg-surface-container flex items-center justify-between">
<div className="flex items-center gap-space-sm min-w-0">
<span className="material-symbols-outlined text-[15px] text-format-docx-text">description</span>
<span className="font-code-mono text-code-mono font-medium text-text-primary truncate">2026년도 클라우드 AI 인프라 구축 추진안_v4.2.docx</span>
<span className="px-1.5 py-0.5 rounded-full bg-surface-card text-text-secondary font-badge-label text-badge-label shadow-sm">자동 저장됨</span>
<span className="hidden sm:inline-flex px-1.5 py-0.5 rounded bg-status-local-bg text-status-local-text font-badge-label text-badge-label">Local Sandbox Validated</span>
</div>
<div className="flex items-center gap-1 shrink-0">
<button className="w-6 h-6 rounded flex items-center justify-center text-text-secondary hover:bg-surface-card hover:text-text-primary transition-colors">
<span className="material-symbols-outlined text-[14px]">undo</span>
</button>
<button className="w-6 h-6 rounded flex items-center justify-center text-text-secondary hover:bg-surface-card hover:text-text-primary transition-colors">
<span className="material-symbols-outlined text-[14px]">redo</span>
</button>
<div className="w-px h-3.5 bg-border-subtle mx-1"></div>
<button className="w-6 h-6 rounded flex items-center justify-center text-text-secondary hover:bg-surface-card">
<span className="material-symbols-outlined text-[14px]">remove</span>
</button>
<button className="w-6 h-6 rounded flex items-center justify-center text-text-secondary hover:bg-surface-card">
<span className="material-symbols-outlined text-[14px]">crop_square</span>
</button>
</div>
</div>

<div className="w-full px-space-md bg-surface-card flex items-center gap-0.5">
<button className="px-3 py-1.5 text-text-secondary font-body-dense text-body-dense hover:text-text-primary transition-colors">홈</button>
<button className="px-3 py-1.5 text-text-secondary font-body-dense text-body-dense hover:text-text-primary transition-colors">삽입</button>
<button className="px-3 py-1.5 text-text-secondary font-body-dense text-body-dense hover:text-text-primary transition-colors">페이지 레이아웃</button>
<button className="px-3 py-1.5 text-text-secondary font-body-dense text-body-dense hover:text-text-primary transition-colors">참조</button>
<button className="px-3 py-1.5 text-text-secondary font-body-dense text-body-dense hover:text-text-primary transition-colors">검토</button>
<button className="px-3 py-1.5 text-text-secondary font-body-dense text-body-dense hover:text-text-primary transition-colors">보기</button>

<button className="relative px-3.5 py-1.5 bg-primary-container text-white font-body-semibold text-body-dense rounded-t flex items-center gap-1.5 shadow-sm">
<span className="material-symbols-outlined text-[15px] text-tertiary-fixed">rocket_launch</span>
<span>DocPilot Studio</span>
<span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse"></span>
</button>
<button className="px-3 py-1.5 text-text-secondary font-body-dense text-body-dense hover:text-text-primary transition-colors">도움말</button>
</div>

<div className="w-full px-space-md py-2 bg-surface-container-low flex items-center justify-between gap-space-lg overflow-x-auto">
<div className="flex items-center gap-space-md shrink-0">

<div className="flex items-center gap-1.5 bg-surface-card px-2.5 py-1.5 rounded shadow-sm">
<button className="flex flex-col items-center justify-center px-2 py-1 rounded hover:bg-surface-container transition-colors group" id="btnRibbonSearch">
<span className="material-symbols-outlined text-[20px] text-secondary group-hover:scale-105 transition-transform">travel_explore</span>
<span className="font-caption text-caption text-text-primary font-semibold mt-0.5">통합 검색</span>
<span className="font-code-mono text-[9px] text-text-secondary">Alt+S</span>
</button>
<div className="w-px h-8 bg-surface-container"></div>
<button className="flex flex-col items-center justify-center px-2 py-1 rounded hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px] text-text-secondary">history_edu</span>
<span className="font-caption text-caption text-text-primary font-semibold mt-0.5">단락 불러오기</span>
<span className="font-code-mono text-[9px] text-text-secondary">기존 보고서</span>
</button>
<button className="flex flex-col items-center justify-center px-2 py-1 rounded hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px] text-format-xlsx-text">table_chart</span>
<span className="font-caption text-caption text-text-primary font-semibold mt-0.5">바이너리 삽입</span>
<span className="font-code-mono text-[9px] text-text-secondary">표/차트 추출</span>
</button>
</div>

<div className="flex items-center gap-1.5 bg-surface-card px-2.5 py-1.5 rounded shadow-sm">
<button className="flex flex-col items-center justify-center px-2 py-1 rounded hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px] text-diff-modified-text">difference</span>
<span className="font-caption text-caption text-text-primary font-semibold mt-0.5">라인 Diff 비교</span>
<span className="font-code-mono text-[9px] text-text-secondary">초안 대조</span>
</button>
<button className="flex flex-col items-center justify-center px-2 py-1 rounded hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px] text-security-dlp-pass">shield_person</span>
<span className="font-caption text-caption text-text-primary font-semibold mt-0.5">DLP 실시간 검사</span>
<span className="font-code-mono text-[9px] text-security-dlp-pass">0건 검출 (Safe)</span>
</button>
</div>

<div className="hidden xl:flex items-center gap-1.5 bg-surface-card px-2.5 py-1.5 rounded shadow-sm">
<button className="flex flex-col items-center justify-center px-2 py-1 rounded hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px] text-text-secondary">translate</span>
<span className="font-caption text-caption text-text-primary font-semibold mt-0.5">전문 인-라인 번역</span>
<span className="font-code-mono text-[9px] text-text-secondary">Ko-En Dual</span>
</button>
<button className="flex flex-col items-center justify-center px-2 py-1 rounded hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px] text-text-secondary">fact_check</span>
<span className="font-caption text-caption text-text-primary font-semibold mt-0.5">기술 규격 감사</span>
<span className="font-code-mono text-[9px] text-text-secondary">K-Gov 통과</span>
</button>
</div>
</div>

<div className="flex items-center gap-2 bg-surface-card px-3 py-1.5 rounded shadow-sm shrink-0">
<span className="w-2 h-2 rounded-full bg-status-local-text animate-ping"></span>
<div className="flex flex-col">
<span className="font-caption text-caption font-semibold text-status-local-text flex items-center gap-1">
            온디바이스 NPU 가속기 연결됨
            <span className="material-symbols-outlined text-[13px]">bolt</span>
</span>
<span className="font-code-mono text-[10px] text-text-secondary leading-none">Latency: 14ms | Local Only</span>
</div>
</div>
</div>
</div>

<div className="w-full flex flex-col lg:flex-row min-h-[calc(100vh-148px)] p-space-md gap-space-md">

<div className="flex-1 lg:w-[65%] flex flex-col items-center bg-surface-canvas rounded-lg overflow-y-auto">

<div className="w-full max-w-[840px] px-8 py-1.5 flex items-center justify-between text-text-secondary font-code-mono text-[10px] opacity-80 select-none">
<div className="flex items-center gap-2">
<span>A4 (210 &times; 297 mm)</span>
<span>&bull;</span>
<span>상하좌우 여백 20.0mm</span>
</div>
<div className="flex items-center gap-3">
<span>배율: 125%</span>
<span>3 / 18 페이지</span>
<span className="px-1.5 py-0.5 bg-surface-container text-text-primary rounded">단어수: 4,892</span>
</div>
</div>

<div className="w-full max-w-[840px] bg-surface-card rounded-md shadow-md p-10 sm:p-14 my-2 flex flex-col relative">

<div className="flex items-center justify-between pb-6 mb-6 bg-gradient-to-r from-surface-container-high/30 to-transparent p-3 rounded">
<div className="flex items-center gap-2">
<span className="h-[18px] px-1.5 rounded border border-format-docx-border bg-format-docx-bg text-format-docx-text font-badge-label text-badge-label flex items-center">DOCX 2026 규격</span>
<span className="font-caption text-caption text-text-secondary">기안 부서: 인프라기획본부 데이터플랫폼개발팀</span>
</div>
<span className="font-caption text-caption text-text-muted">보안등급: 대외비 (Grade II)</span>
</div>

<article className="space-y-6 text-text-primary font-body-default leading-relaxed">
<div className="space-y-2">
<span className="font-code-mono text-body-dense text-secondary font-semibold">SECTION 03</span>
<h1 className="font-display-lg text-display-lg text-primary tracking-tight">3. 차세대 인공지능 하이퍼스케일 IDC 전력 최적화 계획</h1>
<p className="text-text-secondary text-body-default">
              본 문서는 2026년도 AI 연구개발 클러스터 고도화를 위한 저전력 수냉식 랙 인프라 도입 방안을 확정하고, 단계별 총소유비용(TCO) 절감 방안을 수립하는 것을 목적으로 한다.
            </p>
</div>
<div className="space-y-3">
<h2 className="font-title-sm text-title-sm text-text-primary flex items-center gap-2">
<span className="w-1.5 h-4 bg-primary-container rounded-full"></span>
              3.1 인프라 전력 용량 산출 근거
            </h2>
<p className="text-text-secondary text-body-default">
              기존 공랭식 전산실의 경우 최대 전력 밀도가 랙당 12kW에 불과하여 고성능 GPU(B200 / H200 등) 노드 집적에 물리적 한계가 상존한다. 직접 액체 냉각(Direct Liquid Cooling, DLC) 방식 적용을 통해 전력 사용 효율성을 획기적으로 개선하여야 한다.
            </p>
</div>

<div className="p-4 rounded-lg bg-surface-container-low relative">
<div className="flex items-center justify-between mb-2">
<h2 className="font-title-sm text-title-sm text-primary flex items-center gap-2">
<span className="w-1.5 h-4 bg-secondary rounded-full"></span>
                3.2 에너지 효율성 검증 및 PUE 산출 지표
              </h2>
<span className="px-2 py-0.5 rounded bg-status-local-bg text-status-local-text font-caption text-caption font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-status-local-text"></span>
                커서 위치 감지됨
              </span>
</div>
<p className="text-text-primary font-body-default">
              동남권 제2 데이터센터 도입 시 예상되는 연간 전력효율지수(PUE, Power Usage Effectiveness) 목표치는 글로벌 최상위 레벨인 1.15 이하를 지향한다. 이를 달성하기 위한 연간 기온 분포별 하이브리드 냉각 모드 전환 설계치는 다음과 같이 산정된다.
            </p>

<div className="mt-4 p-4 rounded bg-surface-card shadow-sm flex flex-col gap-2 transition-all" id="injectionTargetArea">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="relative flex h-2.5 w-2.5">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
</span>
<span className="font-body-semibold text-body-dense text-secondary">DocPilot 추천 블록 삽입 대기 중...</span>
</div>
<span className="font-code-mono text-[11px] text-text-secondary">[F2 키 또는 사이드바 '삽입' 클릭]</span>
</div>

<div className="p-3 bg-surface-container rounded flex flex-col gap-2 opacity-75">
<div className="flex items-center justify-between text-caption font-caption text-text-secondary">
<span>추천 데이터: '2025_ESG_인프라투자계획서_최종' Slide 14 PUE 지표</span>
<span className="text-format-xlsx-text font-semibold">+연간 71.4억원 절감 수치 포함</span>
</div>
<div className="grid grid-cols-4 gap-2 text-[11px] font-code-mono text-text-secondary pt-1">
<div className="bg-surface-card p-1.5 rounded text-center">구분: 외기냉방+칠러</div>
<div className="bg-surface-card p-1.5 rounded text-center">현재 PUE: 1.48</div>
<div className="bg-surface-card p-1.5 rounded text-center font-bold text-diff-added-text">목표 PUE: 1.14 (-23%)</div>
<div className="bg-surface-card p-1.5 rounded text-center font-semibold text-secondary">연간 절감: 7,140백만원</div>
</div>
</div>
</div>

<p className="text-text-secondary text-body-dense mt-4 leading-normal">
              상기 산출 지표는 산업통상자원부 산하 한국에너지공단의 고효율 에너지기자재 인증 기준을 준수하였으며, 외부 대기 온도가 22&deg;C 이하로 떨어지는 10월부터 이듬해 4월까지는 프리쿨링(Free-cooling) 바이패스 밸브를 완전 개방하여 압축기 운전 전력을 90% 이상 삭감한다.
            </p>
</div>

<div className="space-y-3 opacity-60">
<h2 className="font-title-sm text-title-sm text-text-primary flex items-center gap-2">
<span className="w-1.5 h-4 bg-border-strong rounded-full"></span>
              3.3 단계별 CAPEX / OPEX 재무 모형
            </h2>
<p className="text-text-secondary text-body-default">
              초기 설비 투자액은 전년 대비 약 18.4% 상승하나, 연간 전력비용 및 유지관리 비용 절감을 통해 투자회수기간(Payback Period)을 3.2년 이내로 단축할 수 있을 것으로 분석되었다...
            </p>
</div>
</article>

<div className="mt-12 pt-4 flex items-center justify-between text-text-muted font-caption text-caption">
<span>DocPilot In-App Bridge Native v3.2</span>
<span>페이지 3 / 총 18 페이지</span>
</div>
</div>
</div>

<aside className="w-full lg:w-[35%] flex flex-col bg-surface-card rounded-lg shadow-md overflow-hidden">

<div className="p-3.5 bg-primary-container text-white flex items-center justify-between shadow-sm">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[15px] text-tertiary-fixed">smart_toy</span>
</div>
<div>
<h3 className="font-body-semibold text-body-default text-white flex items-center gap-1.5">
              DocPilot Copilot
              <span className="px-1.5 py-0.2 rounded bg-tertiary-container text-tertiary-fixed font-badge-label text-[9px]">V3.2 TASKPANE</span>
</h3>
</div>
</div>
<div className="flex items-center gap-1 text-on-primary-container">
<button className="p-1 rounded hover:bg-primary hover:text-white transition-colors" title="패널 고정">
<span className="material-symbols-outlined text-[16px]">push_pin</span>
</button>
<button className="p-1 rounded hover:bg-primary hover:text-white transition-colors" title="새로고침">
<span className="material-symbols-outlined text-[16px]">sync</span>
</button>
<button className="p-1 rounded hover:bg-primary hover:text-white transition-colors" title="최소화">
<span className="material-symbols-outlined text-[16px]">dock_to_right</span>
</button>
</div>
</div>

<div className="p-3.5 bg-surface-container flex flex-col gap-2.5">
<div className="relative w-full">
<input className="w-full h-9 pl-9 pr-8 bg-surface-card text-text-primary font-body-default text-body-default rounded focus:outline-none shadow-sm focus:ring-1 focus:ring-secondary transition-all" id="taskpaneSearchInput" placeholder="자연어 질의 또는 관련 사내 보고서 검색..." type="text" value="작년 PUE 실적표 및 절감액"/>
<span className="material-symbols-outlined absolute left-2.5 top-2 text-text-secondary text-[18px]">search</span>
<button className="absolute right-2.5 top-2 text-text-muted hover:text-text-primary">
<span className="material-symbols-outlined text-[16px]">cancel</span>
</button>
</div>

<div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-caption py-0.5">
<button className="px-2 py-0.5 rounded-full bg-secondary text-white font-medium shrink-0 flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">auto_awesome</span>추천 스니펫 3건
          </button>
<button className="px-2 py-0.5 rounded-full bg-surface-card text-text-secondary hover:text-text-primary shrink-0">
            표/도표 객체
          </button>
<button className="px-2 py-0.5 rounded-full bg-surface-card text-text-secondary hover:text-text-primary shrink-0">
            결재 완료본만
          </button>
</div>
</div>

<div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto bg-surface-canvas">

<div className="p-3 bg-surface-card rounded shadow-sm flex items-start gap-2.5">
<div className="w-7 h-7 rounded-full bg-status-local-bg flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[16px] text-security-dlp-pass">verified_user</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between">
<span className="font-body-semibold text-body-dense text-text-primary">DLP 실시간 기밀 검사 통과</span>
<span className="h-[16px] px-1.5 rounded bg-status-local-bg text-security-dlp-pass font-badge-label text-[9px] uppercase font-bold">Safe</span>
</div>
<p className="font-caption text-caption text-text-secondary mt-0.5">
              현재 작성 중인 섹션 내 PII 감지: 주민등록번호 <strong className="text-text-primary">0건</strong>, 계좌번호 <strong className="text-text-primary">0건</strong>, 고객정보 <strong className="text-text-primary">0건</strong> (공공/금융 보안 가이드 충족)
            </p>
</div>
</div>

<div className="p-3.5 bg-surface-card rounded shadow-sm flex flex-col gap-2.5 hover:shadow-md transition-shadow group">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5 min-w-0">
<span className="h-[18px] px-1.5 rounded border border-format-pptx-border bg-format-pptx-bg text-format-pptx-text font-badge-label text-badge-label flex items-center shrink-0">PPTX 슬라이드</span>
<span className="font-body-semibold text-body-dense text-text-primary truncate">2025_ESG_인프라투자계획서_최종.pptx</span>
</div>
<span className="font-code-mono text-[10px] text-text-muted shrink-0">Slide 14</span>
</div>

<div className="bg-surface-container rounded p-2 overflow-x-auto text-[11px] font-body-dense">
<div className="text-[10px] font-code-mono text-text-secondary mb-1 flex items-center justify-between">
<span>[표 객체 미리보기: 냉각 모드별 PUE 및 전력비 비교]</span>
<span className="text-format-xlsx-text font-bold">일치율 98.4%</span>
</div>
<table className="w-full text-left bg-surface-card rounded overflow-hidden">
<thead className="bg-surface-container-high text-text-secondary text-[10px]">
<tr>
<th className="p-1.5">인프라 구분</th>
<th className="p-1.5">기존 공랭식</th>
<th className="p-1.5">DLC 수냉 도입안</th>
<th className="p-1.5">절감 효과</th>
</tr>
</thead>
<tbody className="text-text-primary font-code-mono text-[10px]">
<tr className="hover:bg-surface-container">
<td className="p-1.5 font-medium">연평균 PUE</td>
<td className="p-1.5 text-text-secondary">1.48</td>
<td className="p-1.5 text-secondary font-bold">1.14</td>
<td className="p-1.5 text-diff-added-text bg-diff-added-bg font-bold">▲ 22.9% 향상</td>
</tr>
<tr className="hover:bg-surface-container">
<td className="p-1.5 font-medium">연간 전력비</td>
<td className="p-1.5 text-text-secondary">312.4억</td>
<td className="p-1.5 text-secondary font-bold">241.0억</td>
<td className="p-1.5 text-diff-added-text bg-diff-added-bg font-bold">-71.4억원/년</td>
</tr>
</tbody>
</table>
</div>

<div className="flex items-center gap-2 pt-1">
<button className="flex-1 h-8 px-3 rounded bg-primary-container text-white hover:bg-primary font-body-semibold text-body-dense flex items-center justify-center gap-1.5 shadow-sm transition-colors" id="btnInsertTable">
<span className="material-symbols-outlined text-[15px]">post_add</span>
<span>현재 커서 위치에 표 서식 유지 삽입 (F2)</span>
</button>
<button className="h-8 px-2.5 rounded bg-surface-container text-text-primary hover:bg-surface-container-high font-body-dense text-body-dense flex items-center justify-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[15px] text-text-secondary">format_quote</span>
<span>각주 추가</span>
</button>
</div>
</div>

<div className="p-3.5 bg-surface-card rounded shadow-sm flex flex-col gap-2.5 hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5 min-w-0">
<span className="h-[18px] px-1.5 rounded border border-format-pdf-border bg-format-pdf-bg text-format-pdf-text font-badge-label text-badge-label flex items-center shrink-0">PDF 감사보고서</span>
<span className="font-body-semibold text-body-dense text-text-primary truncate">2025_4분기_데이터센터_에너지감사보고서.pdf</span>
</div>
<span className="font-code-mono text-[10px] text-text-muted shrink-0">p.42 제3절</span>
</div>

<div className="p-2.5 bg-surface-container rounded text-text-primary font-body-default text-body-dense relative">
<span className="material-symbols-outlined absolute right-2 top-2 text-border-strong text-[18px] opacity-40">format_quote</span>
<p className="leading-relaxed pr-5">
              "...외기 냉방 복합 칠러 도입 시 <span className="bg-diff-modified-bg text-diff-modified-text px-1 font-semibold">연간 전력비 71.4억원 절감</span>이 가능함을 교차 실측하였으며, 탄소배출권(K-ETS) 환산 가치는 연간 14.8억원 추가 익익으로 반영할 수 있다..."
            </p>
</div>

<div className="flex items-center justify-between text-caption font-caption text-text-secondary">
<span>출처: 공인감사기관 (주)K-에너지엔지니어링</span>
<span className="text-secondary font-code-mono font-medium">검증신뢰도: 99.8%</span>
</div>

<div className="flex items-center gap-2 pt-1">
<button className="flex-1 h-8 px-3 rounded bg-surface-container text-text-primary hover:bg-surface-container-high font-body-semibold text-body-dense flex items-center justify-center gap-1.5 transition-colors" id="btnCopyQuote">
<span className="material-symbols-outlined text-[15px] text-text-secondary">content_copy</span>
<span>단락 인용구로 복사</span>
</button>
<button className="h-8 px-3 rounded bg-surface-container text-text-primary hover:bg-surface-container-high font-body-dense text-body-dense flex items-center justify-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[15px] text-diff-modified-text">difference</span>
<span>문서 Diff 비교</span>
</button>
</div>
</div>

<div className="p-3.5 bg-surface-card rounded shadow-sm flex flex-col gap-2.5 hover:shadow-md transition-shadow">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5 min-w-0">
<span className="h-[18px] px-1.5 rounded border border-format-hwp-border bg-format-hwp-bg text-format-hwp-text font-badge-label text-badge-label flex items-center shrink-0">HWP 기안서</span>
<span className="font-body-semibold text-body-dense text-text-primary truncate">2025_친환경_클라우드구축_의결안.hwp</span>
</div>
<span className="font-code-mono text-[10px] text-text-muted shrink-0">결재완료</span>
</div>
<p className="font-caption text-caption text-text-secondary">
            이사회 의결 문안: <em>"PUE 1.15를 상회하는 설비 투자에 대해서는 차년도 성과급 연동 지표(KPI)에 감점 조항을 둔다."</em>
</p>
<div className="flex items-center justify-end gap-2">
<button className="text-caption font-caption text-secondary hover:underline flex items-center gap-0.5">
<span>원본 조항 전체 열람</span>
<span className="material-symbols-outlined text-[13px]">open_in_new</span>
</button>
</div>
</div>
</div>

<div className="p-3 bg-surface-card border-t border-border-subtle flex items-center justify-between">
<div className="flex items-center gap-1.5 text-text-secondary font-caption text-caption">
<span className="material-symbols-outlined text-[15px] text-status-local-text">memory</span>
<span>로컬 인덱스 동기화 완료됨</span>
</div>
<button className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-primary font-caption text-caption flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[14px]">tune</span>
<span>프롬프트 설정</span>
</button>
</div>
</aside>
</div>


</div>
    </>
  );
}
