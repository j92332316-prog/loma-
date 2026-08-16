// 從全域變數獲取 React Hook
const { useState, useEffect } = React;

// 題庫資料 (從您提供的資料擷取)
const quizData = [
  {id:101,c:1,q:"Hamilton 是一家相互制保險公司。這一資訊最有可能表明，Hamilton由其______擁有。",o:["(1) 股東","(2) 保單所有人","(3) 業務員","(4) 董事會"],a:1,exp:"相互制保險公司是由其保單所有人共同擁有，不發行股票。"},
  {id:102,c:1,q:"保險公司既有內部客戶，又有外部客戶；有時候保險公司的某一利益相關者既是公司的內部客戶，又是外部客戶。經常被認為既是保險人的內部客戶，又是外部客戶的一個利益相關者實例是______。",o:["(1) 業務員","(2) 監管機構","(3) 保單所有人","(4) 理賠調查員"],a:0,exp:"業務員依賴總部支援(內部客戶)，同時也是將產品銷售出去的管道(外部客戶)。"},
  {id:103,c:1,q:"保險監管分為償付能力監管和市場行為監管。通常，償付能力監管主要致力於確保保險公司______。",o:["(1) 根據監管規定處理保險索賠","(2) 實施公正的行銷和銷售實務","(3) 有能力按時償還其到期債務、契約責任和營業費用","(4) 及時處理客戶投訴"],a:2,exp:"償付能力監管確保保險公司具備財務能力履行未來的財務與契約義務。"},
  {id:201,c:2,q:"對於本題，如果選項（1）到（3）都是正確的，那麼選擇選項（4）。實現良好的公司治理應具備的要素包括______。",o:["(1) 為利益相關者提供透明度和責任性的各級控制體系","(2) 注重平衡所有利益相關者需求的戰略計畫","(3) 領導力以及平衡風險與回報的合乎倫理的組織文化","(4) 以上所有選項"],a:3,exp:"透明度、責任性、平衡利益與道德文化皆是良好公司治理的必備要素。"},
  // (您可以把剩餘的題目貼在這裡)
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const question = quizData[currentQuestion];

  const handleOptionClick = (index) => {
    if (showExplanation) return; // 已經作答就鎖定
    setSelectedOption(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelectedOption(null);
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      alert("恭喜您完成所有題目！");
      setCurrentQuestion(0);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col pt-12 pb-6 px-4 safe-area-pt">
      {/* 頂部標題 */}
      <header className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-800 flex items-center">
          <i data-lucide="book-open" className="mr-2"></i> LOMA 題庫特訓
        </h1>
        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          第 {currentQuestion + 1} / {quizData.length} 題
        </span>
      </header>

      {/* 題目區域 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
          Chapter {question.c}
        </div>
        <h2 className="text-lg text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">
          {question.q}
        </h2>
      </div>

      {/* 選項按鈕 */}
      <div className="space-y-3 flex-grow">
        {question.o.map((opt, index) => {
          let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none flex justify-between items-center";
          let icon = null;

          if (!showExplanation) {
            btnClass += " border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 text-gray-700";
          } else {
            if (index === question.a) {
              btnClass += " border-green-500 bg-green-50 text-green-800 font-medium";
              icon = <i data-lucide="check-circle" className="text-green-600"></i>;
            } else if (index === selectedOption) {
              btnClass += " border-red-400 bg-red-50 text-red-700";
              icon = <i data-lucide="x-circle" className="text-red-500"></i>;
            } else {
              btnClass += " border-gray-200 bg-gray-50 text-gray-400 opacity-60";
            }
          }

          return (
            <button key={index} onClick={() => handleOptionClick(index)} className={btnClass}>
              <span>{opt}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* 解析區塊 */}
      {showExplanation && (
        <div className="mt-6 animate-fade-in-up">
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 mb-6">
            <h3 className="text-sm font-bold text-blue-800 flex items-center mb-1">
              <i data-lucide="lightbulb" className="w-4 h-4 mr-1"></i> 解析
            </h3>
            <p className="text-sm text-blue-900 leading-relaxed">{question.exp}</p>
          </div>
          
          <button 
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-blue-200 active:scale-95"
          >
            {currentQuestion < quizData.length - 1 ? '下一題' : '重新開始'}
            <i data-lucide="arrow-right" className="ml-2 w-5 h-5"></i>
          </button>
        </div>
      )}
    </div>
  );
};

// 渲染 App 並初始化 Lucide 圖示
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<QuizApp />);

// 確保每次渲染後 Lucide 圖示都能更新
React.useEffect(() => {
    lucide.createIcons();
});
