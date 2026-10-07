import React, { useState } from 'react';
import { api } from '../../api';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [aiMode, setAiMode] = useState('local');
  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await api.hybridSearch(searchQuery, aiMode);
      setSearchResults(res.results || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <>
{searchResults.length > 0 && (
  <div className="w-full mb-6 bg-surface-container border-2 border-primary p-4 rounded-lg">
    <h3 className="font-bold text-primary mb-3">✅ 실제 검색 결과 ({searchResults.length}건)</h3>
    <div className="flex flex-col gap-3">
    {searchResults.map((res, idx) => (
      <div key={idx} className="pb-3 border-b border-border-subtle last:border-0">
         <h4 className="font-semibold text-text-primary">{res.file_name}</h4>
         <div className="text-xs text-text-muted mb-1">{res.file_path} {res.location_badge}</div>
         <p className="text-sm italic text-text-secondary" dangerouslySetInnerHTML={{__html: res.snippet}}></p>
      </div>
    ))}
    </div>
  </div>
)}

      <div className="flex flex-col w-full">

<section className="p-space-lg bg-surface-card shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">

<div className="flex-1 flex flex-col gap-space-xs">
<div className="relative flex items-center">
<div className="absolute left-3.5 flex items-center pointer-events-none text-secondary">
<span className="material-symbols-outlined text-[20px]">magic_button</span>
</div>
<input className="w-full h-10 pl-10 pr-28 rounded-lg bg-surface-container text-text-primary font-body-default text-body-default placeholder-text-muted focus:outline-none focus:bg-white shadow-inner" id="query-input" placeholder="검색어를 입력하세요..." type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
<div className="absolute right-1.5 flex items-center gap-1">
<button onClick={handleSearch} disabled={loading} className="h-7 px-3 rounded-lg bg-primary-container text-white font-body-semibold text-body-dense flex items-center gap-1 hover:bg-primary transition-all">
<span className="material-symbols-outlined text-[15px]">search</span>
<span>특징 검색</span>
</button>
</div>
</div>

<div className="flex items-center gap-2 overflow-x-auto pt-0.5">
<span className="font-caption text-caption text-text-secondary whitespace-nowrap flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">bolt</span>추천 시드:
          </span>
<button className="h-6 px-2 rounded-lg bg-surface-container text-text-secondary font-caption text-caption hover:bg-surface-variant hover:text-text-primary whitespace-nowrap transition-colors">
            #데이터센터 서버실 랙 교체
          </button>
<button className="h-6 px-2 rounded-lg bg-surface-container text-text-secondary font-caption text-caption hover:bg-surface-variant hover:text-text-primary whitespace-nowrap transition-colors">
            #친환경 풍력발전 조감도
          </button>
<button className="h-6 px-2 rounded-lg bg-surface-container text-text-secondary font-caption text-caption hover:bg-surface-variant hover:text-text-primary whitespace-nowrap transition-colors">
            #서명 날인된 계약서 스캔본
          </button>
<button className="h-6 px-2 rounded-lg bg-format-docx-bg text-format-docx-text font-caption text-caption whitespace-nowrap">
            &checkmark; 파란색 셔츠 발표 장면
          </button>
</div>
</div>

<div className="shrink-0 flex items-center gap-3 p-space-sm rounded-lg bg-status-local-bg/60 text-status-local-text">
<div className="w-8 h-8 rounded-lg bg-status-local-bg flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px] text-status-local-text animate-pulse">visibility</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-body-semibold text-body-dense text-status-local-text">ViT-B/16 멀티모달 임베딩</span>
<span className="px-1.5 py-0.2 rounded bg-white text-status-local-text font-badge-label text-badge-label">NPU Active</span>
</div>
<span className="font-caption text-caption text-text-secondary truncate">On-Device GPU 가속 &bull; 임베딩 인덱스 1,424건 즉시 매칭</span>
</div>
</div>
</div>

<div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
<div className="flex items-center gap-space-sm">

<div className="flex items-center rounded-lg bg-surface-container p-0.5">
<button className="h-7 px-3 rounded-lg text-text-secondary font-caption text-caption hover:text-text-primary transition-colors">전체 (1,424)</button>
<button className="h-7 px-3 rounded-lg text-text-secondary font-caption text-caption hover:text-text-primary transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">image</span>이미지 (1,240건)
          </button>
<button className="h-7 px-3 rounded-lg bg-surface-card text-text-primary font-body-semibold text-caption shadow-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">movie</span>동영상 (184건)
          </button>
</div>
<div className="h-4 w-px bg-surface-container-high hidden sm:block"></div>

<div className="hidden md:flex items-center gap-1.5">
<span className="h-6 px-2 rounded-lg bg-surface-container text-text-secondary font-caption text-caption">해상도: 1080p 이상</span>
<span className="h-6 px-2 rounded-lg bg-surface-container text-text-secondary font-caption text-caption">최근 90일</span>
</div>
</div>

<div className="flex items-center gap-space-lg">
<div className="flex items-center gap-2">
<span className="font-caption text-caption text-text-secondary">유사도 임계치:</span>
<input className="w-28 h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary" id="threshold-slider" max="95" min="50" oninput="document.getElementById('threshold-val').innerText = this.value + '% 이상'" type="range" value="75"/>
<span className="font-code-mono text-code-mono text-text-primary font-semibold w-16" id="threshold-val">75% 이상</span>
</div>
<div className="flex items-center gap-1">
<button className="w-7 h-7 rounded-lg bg-surface-container text-text-primary flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-[16px]">grid_view</span>
</button>
<button className="w-7 h-7 rounded-lg text-text-secondary hover:bg-surface-container flex items-center justify-center">
<span className="material-symbols-outlined text-[16px]">view_agenda</span>
</button>
</div>
</div>
</div>
</section>

<div className="p-space-lg flex flex-col xl:flex-row gap-space-lg items-start">

<div className="flex-1 min-w-0 w-full flex flex-col gap-space-md">

<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="font-title-sm text-title-sm text-text-primary">검색 결과</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary font-code-mono text-caption font-semibold">4건 최적 매칭 (0.042초 소요)</span>
</div>
<div className="flex items-center gap-2 text-text-secondary font-caption text-caption">
<span>정렬: 비전 유사도순</span>
<span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md w-full">

<article className="group rounded-xl bg-surface-card overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
<div className="relative w-full aspect-video bg-surface-container overflow-hidden cursor-pointer">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A corporate boardroom presentation scene where an executive wearing a crisp navy-blue business shirt stands by a holographic digital screen explaining server infrastructure graphs, illuminated with professional ambient office lighting, clean minimalist corporate interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH29SHj3qPD3vL6PebwNWDeCnl-gXRZcpvJ2qTW0oV3Px25QxosEz4SoKwWRAwNtIn4JTJbKqcYBbNAxxSzSYc685Z6_15IS3j62-Tq-HP2a-HQbWqwU5s3pzH9PM3ZX9slq73RcBMVnFwjyi7iJ5irRmmALxO5XYCG4__TtbPyQ4x9euEvxxnKOKIb6f8WCODvbIDk0W0qtYt1RS6ZzdPKZgao3UPn47TVpbR_4uV2rKU-C3BiEN0pA"/>

<div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-primary/80 backdrop-blur-md text-white font-code-mono text-badge-label flex items-center gap-1">
<span className="material-symbols-outlined text-[12px] text-diff-added-bg">play_circle</span> 01:23 ~ 01:45
              </span>
<span className="px-2 py-0.5 rounded-md bg-secondary text-white font-code-mono text-badge-label font-bold">
                94.8% 매칭
              </span>
</div>
<div className="absolute top-2.5 right-2.5">
<span className="h-5 px-1.5 rounded bg-surface-card/90 backdrop-blur-sm text-text-primary font-code-mono text-badge-label flex items-center">
                42:15 전체
              </span>
</div>

<div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
<div className="w-12 h-12 rounded-full bg-white/95 shadow-xl flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[28px] translate-x-0.5">play_arrow</span>
</div>
</div>

<div className="absolute bottom-0 inset-x-0 h-9 bg-primary-container/85 backdrop-blur-md px-2 flex items-center justify-between gap-1 opacity-90 group-hover:opacity-100">
<div className="flex items-center gap-1.5 w-full">
<div className="w-7 h-5 rounded overflow-hidden bg-surface-container shrink-0">
<div className="w-full h-full bg-secondary-container/40"></div>
</div>
<div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden">
<div className="absolute left-1/4 w-1/5 h-full bg-diff-added-bg rounded-full shadow-[0_0_8px_#10b981]"></div>
<div className="absolute left-[32%] top-0 bottom-0 w-1 bg-white"></div>
</div>
<span className="font-code-mono text-badge-label text-white/90 whitespace-nowrap">01:28</span>
</div>
</div>
</div>

<div className="p-space-md flex flex-col gap-space-xs flex-1 justify-between">
<div>
<div className="flex items-start justify-between gap-2">
<h3 className="font-body-semibold text-body-default text-text-primary truncate">
                  2026_신사옥_건립_설계보고회_녹화.mp4
                </h3>
<span className="h-4 px-1.5 rounded bg-format-pptx-bg text-format-pptx-text font-badge-label text-badge-label shrink-0">
                  MP4 / 4K
                </span>
</div>
<p className="font-caption text-caption text-text-secondary mt-0.5 line-clamp-1">
                대회의실 A &bull; 참석자: 인프라혁신팀 &bull; 화자: 김수현 수석
              </p>
</div>

<div className="flex flex-wrap gap-1 mt-1">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-text-secondary font-caption text-badge-label">#블루셔츠_발표자</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-text-secondary font-caption text-badge-label">#회의실_스크린</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-text-secondary font-caption text-badge-label">#에너지절감표</span>
</div>

<div className="pt-space-xs flex items-center justify-between gap-1">
<button className="h-7 px-2.5 rounded-lg bg-surface-container text-text-primary font-caption text-caption hover:bg-surface-variant flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[14px] text-secondary">play_circle</span>
<span>구간 재생</span>
</button>
<div className="flex items-center gap-1">
<button className="w-7 h-7 rounded-lg text-text-secondary hover:bg-surface-container hover:text-text-primary flex items-center justify-center transition-colors" title="원본 폴더 열기">
<span className="material-symbols-outlined text-[16px]">folder_open</span>
</button>
<button className="w-7 h-7 rounded-lg text-text-secondary hover:bg-surface-container hover:text-text-primary flex items-center justify-center transition-colors" title="오피스 삽입 클립보드 복사">
<span className="material-symbols-outlined text-[16px]">content_copy</span>
</button>
</div>
</div>
</div>
</article>

<article className="group rounded-xl bg-surface-card overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
<div className="relative w-full aspect-video bg-surface-container overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="An engineer wearing a royal blue button-down shirt gesturing toward a liquid cooling server rack unit in a high-tech modern enterprise data center, sharp lighting highlighting metallic server components and blue cooling LEDs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVJ3PFq5szOWCA5vnOTkWMPZOVJrlKTjraJh77GTrkmV_v92MOxqEPIg-2LdmrFqRB7PqPvQLjDDIjt9sfV6KSkKhEnpF8pFTqeW6UFdp3YLfb5H2-gBdnMLVl-z4X3QG36SXFFM-WpNlBQBtEhBACg8TPHcSPIK78wSxLosiOOnN83l3t794jxxIBkKTIYAXdDcbKZHtBrcOo68nTvEM-kCy_5OJt-mwDkV8aa6TE0RE-Yufbmb_8uw"/>
<div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-secondary text-white font-code-mono text-badge-label font-bold">
                92.4% 유사도
              </span>
<span className="px-2 py-0.5 rounded-md bg-surface-card/90 text-text-primary font-code-mono text-badge-label font-semibold">
                RAW STILL
              </span>
</div>
<div className="absolute bottom-2.5 right-2.5">
<span className="px-2 py-0.5 rounded-md bg-primary-container/80 backdrop-blur-sm text-white font-code-mono text-badge-label">
                4032 &times; 3024 &bull; 12.4MB
              </span>
</div>
</div>
<div className="p-space-md flex flex-col gap-space-xs flex-1 justify-between">
<div>
<div className="flex items-start justify-between gap-2">
<h3 className="font-body-semibold text-body-default text-text-primary truncate">
                  차세대_냉각시스템_실증실험_촬영.png
                </h3>
<span className="h-4 px-1.5 rounded bg-format-xlsx-bg text-format-xlsx-text font-badge-label text-badge-label shrink-0">
                  PNG
                </span>
</div>
<p className="font-caption text-caption text-text-secondary mt-0.5 line-clamp-1">
                경북 제2데이터센터 IDC R&amp;D Lab 4실
              </p>
</div>
<div className="flex flex-wrap gap-1 mt-1">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-text-secondary font-caption text-badge-label">#서버랙</span>
<span className="px-1.5 py-0.5 rounded bg-status-local-bg text-status-local-text font-caption text-badge-label">#블루셔츠_발표자</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-text-secondary font-caption text-badge-label">#프레젠테이션</span>
</div>
<div className="pt-space-xs flex items-center justify-between gap-1">
<button className="h-7 px-2.5 rounded-lg bg-surface-container text-text-primary font-caption text-caption hover:bg-surface-variant flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[14px]">zoom_in</span>
<span>원본 뷰어</span>
</button>
<div className="flex items-center gap-1">
<button className="w-7 h-7 rounded-lg text-text-secondary hover:bg-surface-container hover:text-text-primary flex items-center justify-center transition-colors" title="원본 폴더 열기">
<span className="material-symbols-outlined text-[16px]">folder_open</span>
</button>
<button className="w-7 h-7 rounded-lg text-text-secondary hover:bg-surface-container hover:text-text-primary flex items-center justify-center transition-colors" title="오피스 삽입 클립보드 복사">
<span className="material-symbols-outlined text-[16px]">content_copy</span>
</button>
</div>
</div>
</div>
</article>

<article className="group rounded-xl bg-surface-card overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
<div className="relative w-full aspect-video bg-surface-container overflow-hidden cursor-pointer">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="An operations supervisor in a dark blue collared shirt standing in front of high-density blade servers with glass reflective floor panels, pointing at network topology charts on a wall mounted TV display" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-MOXaiJLuimX_tMXp9lkYHDbvJ9iS-6gU4Ouw2BZ6iN6HQrL7DiVbrgFMS2RIS345x4TH-GMHb2ajyrpcB-7v_t_WaOC-BbnpyQUuJlPh5uMSkSDNLkZMwKq_IBSfyb2ie94-TfDZy6eBO247uh8Tr7MkpeyqZQPEjGRK9QkgZcYPr6qllSqqBxolAf3lkiOmh3G13mH--k2slYvp_z1TU49SjZXnYi33WKb-7xkpy3QFAHonmNG1Kw"/>
<div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-primary/80 backdrop-blur-md text-white font-code-mono text-badge-label flex items-center gap-1">
<span className="material-symbols-outlined text-[12px] text-diff-added-bg">play_circle</span> 08:12 ~ 08:35
              </span>
<span className="px-2 py-0.5 rounded-md bg-secondary text-white font-code-mono text-badge-label font-bold">
                89.2% 매칭
              </span>
</div>
<div className="absolute bottom-2.5 right-2.5">
<span className="px-2 py-0.5 rounded-md bg-primary-container/80 backdrop-blur-sm text-white font-code-mono text-badge-label">
                24:30
              </span>
</div>
<div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
<div className="w-10 h-10 rounded-full bg-white/95 shadow-xl flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[24px] translate-x-0.5">play_arrow</span>
</div>
</div>
</div>
<div className="p-space-md flex flex-col gap-space-xs flex-1 justify-between">
<div>
<div className="flex items-start justify-between gap-2">
<h3 className="font-body-semibold text-body-default text-text-primary truncate">
                  AI_데이터센터_현장점검_클립.mp4
                </h3>
<span className="h-4 px-1.5 rounded bg-format-docx-bg text-format-docx-text font-badge-label text-badge-label shrink-0">
                  MP4
                </span>
</div>
<p className="font-caption text-caption text-text-secondary mt-0.5 line-clamp-1">
                상암 디지털단지 메인 백본망 설비실 점검 녹화
              </p>
</div>
<div className="flex flex-wrap gap-1 mt-1">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-text-secondary font-caption text-badge-label">#통신랙</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-text-secondary font-caption text-badge-label">#블루셔츠</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-text-secondary font-caption text-badge-label">#모니터링</span>
</div>
<div className="pt-space-xs flex items-center justify-between gap-1">
<button className="h-7 px-2.5 rounded-lg bg-surface-container text-text-primary font-caption text-caption hover:bg-surface-variant flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[14px] text-secondary">play_circle</span>
<span>구간 재생</span>
</button>
<div className="flex items-center gap-1">
<button className="w-7 h-7 rounded-lg text-text-secondary hover:bg-surface-container hover:text-text-primary flex items-center justify-center transition-colors" title="원본 폴더 열기">
<span className="material-symbols-outlined text-[16px]">folder_open</span>
</button>
<button className="w-7 h-7 rounded-lg text-text-secondary hover:bg-surface-container hover:text-text-primary flex items-center justify-center transition-colors" title="오피스 삽입 클립보드 복사">
<span className="material-symbols-outlined text-[16px]">content_copy</span>
</button>
</div>
</div>
</div>
</article>

<article className="group rounded-xl bg-surface-card overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
<div className="relative w-full aspect-video bg-surface-container overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A brightly lit executive boardroom where a presenter in light blue tailored shirt speaks while holding a remote clicker pointing at an overhead presentation screen displaying quarterly metrics, glass table reflects warm interior light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ9y_OvhVGag1NjUgeM6r9Eno8St2Q9UIBWJJI19FleBhSmHYpMarHyCS3F4HjAisVIaKdJP0TncsqpLYF9g1Pm8jvcoF9Z0ofbdVRFN5gZSOOg-9icCouNhmwrY-jFNL-Y_ZUvWo2r-RMWde5J-bwv-mWXY325Sh0lKn5Bwuj1s4pyUe8do4rgLu65wXGvg_HhrBeny0srDgpAYjJlRY3PH81pmXVeasfQtN0w5bLBVeD29cYzQY8uA"/>
<div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
<span className="px-2 py-0.5 rounded-md bg-secondary text-white font-code-mono text-badge-label font-bold">
                88.1% 유사도
              </span>
</div>
<div className="absolute bottom-2.5 right-2.5">
<span className="px-2 py-0.5 rounded-md bg-primary-container/80 backdrop-blur-sm text-white font-code-mono text-badge-label">
                1920 &times; 1080 &bull; 3.2MB
              </span>
</div>
</div>
<div className="p-space-md flex flex-col gap-space-xs flex-1 justify-between">
<div>
<div className="flex items-start justify-between gap-2">
<h3 className="font-body-semibold text-body-default text-text-primary truncate">
                  Q3_이사회_설명회_스냅샷_04.jpg
                </h3>
<span className="h-4 px-1.5 rounded bg-format-pptx-bg text-format-pptx-text font-badge-label text-badge-label shrink-0">
                  JPG
                </span>
</div>
<p className="font-caption text-caption text-text-secondary mt-0.5 line-clamp-1">
                본관 대회의실 3호 &bull; 2025.10.14 촬영
              </p>
</div>
<div className="flex flex-wrap gap-1 mt-1">
<span className="px-1.5 py-0.5 rounded bg-surface-container text-text-secondary font-caption text-badge-label">#회의실</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-text-secondary font-caption text-badge-label">#빔프로젝터</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-text-secondary font-caption text-badge-label">#청중</span>
</div>
<div className="pt-space-xs flex items-center justify-between gap-1">
<button className="h-7 px-2.5 rounded-lg bg-surface-container text-text-primary font-caption text-caption hover:bg-surface-variant flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[14px]">zoom_in</span>
<span>원본 뷰어</span>
</button>
<div className="flex items-center gap-1">
<button className="w-7 h-7 rounded-lg text-text-secondary hover:bg-surface-container hover:text-text-primary flex items-center justify-center transition-colors" title="원본 폴더 열기">
<span className="material-symbols-outlined text-[16px]">folder_open</span>
</button>
<button className="w-7 h-7 rounded-lg text-text-secondary hover:bg-surface-container hover:text-text-primary flex items-center justify-center transition-colors" title="오피스 삽입 클립보드 복사">
<span className="material-symbols-outlined text-[16px]">content_copy</span>
</button>
</div>
</div>
</div>
</article>
</div>
</div>

<aside className="w-full xl:w-[440px] shrink-0 rounded-xl bg-surface-card shadow-sm overflow-hidden flex flex-col" id="inspector-dock">

<div className="p-space-md bg-primary-container text-white flex items-center justify-between">
<div className="flex items-center gap-2 min-w-0">
<span className="w-2.5 h-2.5 rounded-full bg-status-local-text animate-pulse"></span>
<span className="font-body-semibold text-body-default truncate">타깃 장면 포커스 뷰어</span>
</div>
<div className="flex items-center gap-1 shrink-0">
<span className="font-code-mono text-badge-label text-tertiary-fixed bg-tertiary-container px-2 py-0.5 rounded">
            FRAME ID #4180
          </span>
<button className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10">
<span className="material-symbols-outlined text-[18px]">open_in_new</span>
</button>
</div>
</div>

<div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Close-up framing of an engineering speaker standing in front of high-tech presentation slides wearing a blue dress shirt, realistic surveillance and conference camera angle, focused crisp subject lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsohrnao4Jf0N9HP40n8LM-ynM2MyuoG3EfT3Lr3uZyW6mr-_h6cmSsQ0r6ArRm4AULMAC00hoTyE4ivQUILC92M5EOKNogbK676mNl7FUZl753h-6YdYkmEp0BeGLutjmByHDxDVck82xBD4dmuqk2znQyZWE97qMoRUntc6hGN-xi_RLiyCuZ9LifmQpvBl5kC1yrYd1paTcxNMvEDCf3i4QTEcA2TrEcoekrSht04NFh3e_GJAcJQ"/>

<div className="absolute inset-y-[15%] left-[28%] w-[42%] pointer-events-none">
<div className="w-full h-full border-2 border-secondary rounded shadow-[0_0_15px_rgba(37,99,235,0.45)] relative animate-pulse">
<div className="absolute -top-6 left-0 px-1.5 py-0.5 rounded bg-secondary text-white font-code-mono text-badge-label whitespace-nowrap flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[10px]">person</span>
<span>Person (Blue Shirt): 98.4%</span>
</div>
<div className="absolute -bottom-5 right-0 px-1.5 py-0.2 rounded bg-primary-container/90 text-white font-code-mono text-[9px]">
              BB: [X:320, Y:110, W:240, H:410]
            </div>
</div>
</div>

<div className="absolute bottom-2.5 inset-x-3 bg-primary-container/90 backdrop-blur-md rounded-lg p-2 flex flex-col gap-1.5 text-white">

<div className="relative w-full h-2 bg-white/20 rounded-full cursor-pointer">

<div className="absolute left-[3%] w-[6%] h-full bg-secondary-container/70 rounded-full" title="00:15~00:40 서론"></div>

<div className="absolute left-[18%] w-[12%] h-full bg-status-local-text rounded-full shadow-[0_0_8px_#0d9488]" title="01:23~01:45 핵심 발표 구간"></div>

<div className="absolute left-[64%] w-[8%] h-full bg-secondary-container/70 rounded-full" title="04:12 질의응답"></div>

<div className="absolute left-[22%] -top-1 w-4 h-4 rounded-full bg-white shadow-md flex items-center justify-center">
<div className="w-1.5 h-1.5 rounded-full bg-primary-container"></div>
</div>
</div>
<div className="flex items-center justify-between text-badge-label font-code-mono">
<div className="flex items-center gap-2">
<button className="hover:text-tertiary-fixed"><span className="material-symbols-outlined text-[16px]">pause</span></button>
<button className="hover:text-tertiary-fixed"><span className="material-symbols-outlined text-[16px]">replay_10</span></button>
<button className="hover:text-tertiary-fixed"><span className="material-symbols-outlined text-[16px]">forward_10</span></button>
<span className="text-white/80">01:28 / 42:15</span>
</div>
<div className="flex items-center gap-1.5">
<span className="px-1 rounded bg-white/20 text-white">1.0x</span>
<button className="hover:text-tertiary-fixed"><span className="material-symbols-outlined text-[16px]">volume_up</span></button>
<button className="hover:text-tertiary-fixed"><span className="material-symbols-outlined text-[16px]">fullscreen</span></button>
</div>
</div>
</div>
</div>

<div className="p-space-md flex flex-col gap-space-sm bg-surface-canvas/50">
<div className="flex items-center justify-between">
<span className="font-caption text-caption text-text-secondary uppercase font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">graphic_eq</span>음성 자막 싱크 (STT On-Device)
          </span>
<span className="font-code-mono text-badge-label text-status-local-text">Confidence 96.7%</span>
</div>

<div className="p-space-sm rounded-lg bg-surface-card shadow-sm flex flex-col gap-1">
<div className="flex items-center gap-2 font-code-mono text-badge-label text-text-secondary">
<span className="px-1 rounded bg-surface-container text-text-primary">01:25</span>
<span>화자 1 (발표자):</span>
</div>
<p className="font-body-default text-body-default text-text-primary leading-relaxed">
            "...신규 <mark className="bg-diff-modified-bg text-diff-modified-text px-1 rounded font-semibold">냉각 시스템</mark> 채택 시 연간 에너지 비용을 <mark className="bg-diff-added-bg text-diff-added-text px-1 rounded font-semibold">38% 이상 감축</mark>할 수 있음을 보고드립니다."
          </p>
</div>

<div className="mt-1 flex flex-col gap-1">
<span className="font-caption text-caption text-text-secondary uppercase font-semibold">비전/언어 다중 모달 매칭 분석</span>
<div className="grid grid-cols-2 gap-2 text-caption">
<div className="p-2 rounded bg-surface-card flex items-center justify-between">
<span className="text-text-secondary">시각적 유사도</span>
<span className="font-code-mono font-semibold text-text-primary">95.2%</span>
</div>
<div className="p-2 rounded bg-surface-card flex items-center justify-between">
<span className="text-text-secondary">자막 맥락 일치</span>
<span className="font-code-mono font-semibold text-text-primary">93.8%</span>
</div>
</div>
</div>

<div className="pt-space-xs flex flex-col gap-1.5">
<button className="h-8 w-full rounded-lg bg-primary-container text-white font-body-semibold text-caption hover:bg-primary flex items-center justify-center gap-1.5 shadow-sm transition-all">
<span className="material-symbols-outlined text-[16px]">content_paste</span>
<span>보고서에 타임스탬프 &amp; 스크린샷 붙여넣기</span>
</button>
<div className="flex items-center gap-2">
<button className="h-7 flex-1 rounded-lg bg-surface-card text-text-secondary font-caption text-caption hover:bg-surface-container flex items-center justify-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[14px]">download</span>
<span>1080p 스틸 캡처</span>
</button>
<button className="h-7 flex-1 rounded-lg bg-surface-card text-text-secondary font-caption text-caption hover:bg-surface-container flex items-center justify-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[14px]">share</span>
<span>구간 공유 링크</span>
</button>
</div>
</div>
</div>
</aside>
</div>

<div className="fixed bottom-12 right-6 bg-primary-container text-white px-4 py-2.5 rounded-lg shadow-xl font-body-default text-body-dense flex items-center gap-2 translate-y-20 opacity-0 transition-all pointer-events-none z-50" id="toast-notify">
<span className="material-symbols-outlined text-tertiary-fixed text-[18px]">task_alt</span>
<span id="toast-text">문서 첨부용 링크와 메타데이터가 클립보드에 복사되었습니다.</span>
</div>
</div>

    </>
  );
}
