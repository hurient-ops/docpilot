import React, { useState, useEffect } from 'react';

interface FolderPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
  initialPath?: string;
}

export const FolderPickerModal: React.FC<FolderPickerModalProps> = ({ isOpen, onClose, onSelect, initialPath = "" }) => {
  const [currentPath, setCurrentPath] = useState<string>(initialPath);
  const [parentPath, setParentPath] = useState<string>("");
  const [directories, setDirectories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDirectories = async (path: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/browse?path=${encodeURIComponent(path)}`);
      const data = await response.json();
      if (data.error && data.error !== "Not a directory") {
        setError(data.error);
      } else {
        setDirectories(data.directories || []);
        setCurrentPath(data.current_path);
        setParentPath(data.parent_path || "");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load directories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDirectories(initialPath);
    }
  }, [isOpen, initialPath]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-surface-card w-full max-w-lg rounded-xl shadow-lg flex flex-col overflow-hidden max-h-[80vh]">
        {/* Header */}
        <div className="px-space-md py-space-sm border-b border-surface-container flex items-center justify-between bg-surface-canvas">
          <h3 className="font-title-sm font-bold text-text-primary">폴더 선택</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Current Path & Back Button */}
        <div className="p-space-sm bg-surface-container flex items-center gap-space-sm border-b border-surface-variant">
          <button 
            onClick={() => fetchDirectories(parentPath)} 
            disabled={currentPath === "" || currentPath === parentPath}
            className="p-1 rounded hover:bg-surface-variant disabled:opacity-50 disabled:cursor-not-allowed text-text-primary"
            title="상위 폴더로 이동"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
          </button>
          <input 
            type="text" 
            value={currentPath}
            onChange={(e) => setCurrentPath(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchDirectories(currentPath)}
            className="flex-1 bg-surface-card border border-surface-variant rounded px-2 py-1 text-code-mono font-code-mono text-sm focus:outline-none focus:border-secondary"
          />
          <button onClick={() => fetchDirectories(currentPath)} className="px-3 py-1 bg-secondary text-white rounded text-sm">
            이동
          </button>
        </div>

        {/* Directory List */}
        <div className="flex-1 overflow-y-auto p-2 bg-surface-card min-h-[300px]">
          {loading ? (
            <div className="flex justify-center items-center h-full text-text-muted">로딩 중...</div>
          ) : error ? (
            <div className="text-red-500 p-4 text-center">{error}</div>
          ) : directories.length === 0 ? (
            <div className="text-center text-text-muted mt-10">하위 폴더가 없습니다.</div>
          ) : (
            <ul className="space-y-1">
              {directories.map(dir => (
                <li key={dir}>
                  <button 
                    onClick={() => fetchDirectories(currentPath ? (currentPath.endsWith('\\\\') || currentPath.endsWith('/') ? currentPath + dir : `${currentPath}\\\\${dir}`) : dir)}
                    className="w-full text-left flex items-center gap-2 px-2 py-1.5 hover:bg-surface-container rounded text-text-primary group"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary group-hover:text-primary-fixed">folder</span>
                    <span className="font-body-md truncate">{dir}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-space-md py-space-sm border-t border-surface-container flex justify-end gap-space-sm bg-surface-canvas">
          <button onClick={onClose} className="px-4 py-2 rounded font-body-semibold text-text-secondary hover:bg-surface-container">
            취소
          </button>
          <button onClick={() => { onSelect(currentPath); onClose(); }} className="px-4 py-2 rounded bg-primary text-on-primary font-body-semibold hover:bg-primary-fixed">
            선택
          </button>
        </div>
      </div>
    </div>
  );
};
