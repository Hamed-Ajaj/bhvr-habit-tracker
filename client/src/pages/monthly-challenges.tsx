import { useState } from 'react';
import { CheckCircle, Target, TrendingUp, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OverViewChallenges from '@/components/overview-challenges';
import ProgressChallenges from '@/components/progress-challenges';

const MonthlyChallenges = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress'>('overview');

  return (
    <main className="flex flex-col items-center w-full min-h-screen py-4">
      <div className="w-full max-w-4xl px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-black">Monthly Challenges</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Take on new challenges every month to boost your productivity and build better habits!
          </p>
        </div>

        <div className="bg-gray-200 rounded-full py-5 h-8 my-2 gap-1 flex px-2  items-center mx-auto w-full">
          <button className={`w-1/2 ${activeTab === 'overview' ? 'bg-blue-600 text-white font-semibold' : 'bg-white'} rounded-full p-1 duration-200`} onClick={() => setActiveTab('overview')} >Overview</button>
          <button className={`w-1/2 ${activeTab === 'progress' ? 'bg-blue-600 text-white font-semibold' : 'bg-white'} rounded-full p-1 duration-200`} onClick={() => setActiveTab("progress")}>Progress</button>
        </div>
        {activeTab === 'overview' ? (<OverViewChallenges />) : (
          <ProgressChallenges />
        )}

        {/* Success Message */}
        {/* {completedCount === challenges.length && joinedChallenge && ( */}
        {/*   <div className="bg-green-500 text-white rounded-lg p-6 text-center shadow-lg"> */}
        {/*     <CheckCircle className="w-12 h-12 mx-auto mb-3" /> */}
        {/*     <h3 className="text-2xl font-bold mb-2">Congratulations! 🎉</h3> */}
        {/*     <p className="text-green-100"> */}
        {/*       You've completed all challenges for this month. Keep up the great work! */}
        {/*     </p> */}
        {/*   </div> */}
        {/* )} */}
      </div>
    </main >
  );
};

export default MonthlyChallenges;
