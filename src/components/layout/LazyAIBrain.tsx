import dynamic from 'next/dynamic';

const AIBrain = dynamic(() => import('./AIBrain'), {
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center text-gray-500 font-mono text-xs">INITIALIZING AI CORE...</div>
});

export default AIBrain;
