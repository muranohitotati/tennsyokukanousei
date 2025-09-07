document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    const startScreen = document.getElementById('start-screen');
    const questionnaireEl = document.getElementById('questionnaire');
    const resultsEl = document.getElementById('results');
    const planEl = document.getElementById('plan');

    const questionContainer = document.getElementById('question-container');
    const resultsContainer = document.getElementById('results-container');
    const planContainer = document.getElementById('plan-container');
    const planTitle = document.getElementById('plan-title');
    const progressBar = document.getElementById('progress-bar');

    let currentQuestionIndex = 0;
    let userAnswers = {};

    const questions = [
        {
            key: 'interest',
            text: 'どの分野に最も興味がありますか？',
            options: [
                { text: '文章を書いたり、情報を発信する', value: 'writing' },
                { text: 'デザインやイラストなど、創作活動', value: 'creative' },
                { text: 'プログラミングやデータ分析', value: 'tech' },
                { text: '人と話し、教えたり助けたりする', value: 'coaching' },
                { text: '手作業で何かを作ったり、作業したりする', value: 'manual' },
            ],
        },
        {
            key: 'time',
            text: '週にどれくらいの時間を副業に使えますか？',
            options: [
                { text: '5時間未満', value: 'low' },
                { text: '5〜10時間', value: 'medium' },
                { text: '10時間以上', value: 'high' },
            ],
        },
        {
            key: 'income',
            text: '月々の目標収入はどれくらいですか？',
            options: [
                { text: 'まずは〜3万円', value: 'low' },
                { text: '5万円以上', value: 'medium' },
                { text: '10万円以上', value: 'high' },
            ],
        },
        {
            key: 'style',
            text: 'どのような働き方が理想ですか？',
            options: [
                { text: '自分のペースでコンテンツや商品を作る', value: 'product' },
                { text: 'クライアントの要望に応えて仕事をする', value: 'client' },
                { text: '自分の知識やスキルを直接提供する', value: 'service' },
            ],
        },
    ];

    const sideHustles = [
        { name: 'ブログ・アフィリエイト', tags: ['writing', 'product', 'low-time', 'medium-time', 'high-time', 'low-income', 'medium-income', 'high-income'], desc: '興味のある分野について記事を書き、広告収入や商品紹介で収益を得ます。' },
        { name: 'Webライター', tags: ['writing', 'client', 'low-time', 'medium-time', 'high-time', 'low-income', 'medium-income'], desc: '企業のウェブサイトやメディアの記事を執筆します。' },
        { name: 'SNS運用代行', tags: ['writing', 'coaching', 'client', 'medium-time', 'high-time', 'medium-income', 'high-income'], desc: '企業や個人のSNSアカウントの投稿作成や分析を代行します。' },
        { name: 'イラスト販売', tags: ['creative', 'product', 'low-time', 'medium-time', 'high-time', 'low-income', 'medium-income'], desc: '自分で描いたイラストをオンラインで販売します。' },
        { name: 'デザイン制作', tags: ['creative', 'client', 'medium-time', 'high-time', 'medium-income', 'high-income'], desc: 'ロゴ、バナー、ウェブサイトなどのデザインを請け負います。' },
        { name: '動画編集', tags: ['creative', 'tech', 'client', 'medium-time', 'high-time', 'medium-income', 'high-income'], desc: 'YouTuberや企業の動画を編集します。' },
        { name: 'プログラミング', tags: ['tech', 'client', 'medium-time', 'high-time', 'medium-income', 'high-income'], desc: 'ウェブサイト制作や小規模なツール開発などを請け負います。' },
        { name: 'オンラインアシスタント', tags: ['manual', 'writing', 'client', 'low-time', 'medium-time', 'high-time', 'low-income', 'medium-income'], desc: '事務作業、スケジュール管理、リサーチなどをオンラインでサポートします。' },
        { name: 'オンラインコンサル・コーチング', tags: ['coaching', 'service', 'low-time', 'medium-time', 'medium-income', 'high-income'], desc: '専門知識や経験を活かして、個人や企業の相談に乗ります。' },
        { name: 'ハンドメイド販売', tags: ['manual', 'creative', 'product', 'low-time', 'medium-time', 'high-time', 'low-income', 'medium-income'], desc: 'アクセサリーや小物など、手作りの作品を販売します。' },
    ];
    
    const plans = {
        default: {
            q1: {
                title: '第1四半期 (1-3ヶ月): 基礎固めと学習',
                tasks: [
                    '関連書籍を3冊以上読み、基礎知識を徹底的にインプットする。',
                    'UdemyやCourseraなどで関連オンライン講座を1つ受講し、スキルを体系的に学ぶ。',
                    '自分のポートフォリオ（実績集）となるSNSアカウントやブログを開設する。'
                ]
            },
            q2: {
                title: '第2四半期 (4-6ヶ月): 実践と最初の収益化',
                tasks: [
                    'クラウドソーシングサイト等で、低単価でも良いので最初の案件を1件獲得する。',
                    '完成した制作物や成果をポートフォリオに追加し、実績を「見える化」する。',
                    '月々5,000円の安定収入を目標に、継続的に営業またはコンテンツ作成を行う。'
                ]
            },
            q3: {
                title: '第3四半期 (7-9ヶ月): 成長と単価交渉',
                tasks: [
                    '実績を基に、サービス単価の見直しや値上げ交渉を行う。',
                    '特定の分野に特化し、「〇〇の専門家」としての地位を確立し始める。',
                    '月々3万円〜5万円の収入を目標に、より高単価な案件や複数のクライアント獲得を目指す。'
                ]
            },
            q4: {
                title: '第4四半期 (10-12ヶ月): 安定化と次の展開',
                tasks: [
                    '作業プロセスを見直し、テンプレートやツールを活用して効率化を図る。',
                    'これまでの実績をまとめ、情報発信（ブログ、SNS）を強化して集客の自動化を目指す。',
                    '月々10万円の目標達成、または次の1年に向けた新たな事業計画を立てる。'
                ]
            }
        }
    };

    function start() {
        currentQuestionIndex = 0;
        userAnswers = {};
        startScreen.classList.add('hidden');
        resultsEl.classList.add('hidden');
        planEl.classList.add('hidden');
        questionnaireEl.classList.remove('hidden');
        displayQuestion();
    }

    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progress}%`;

        let optionsHtml = question.options.map(option => 
            `<button class="option-btn" data-value="${option.value}">${option.text}</button>`
        ).join('');

        questionContainer.innerHTML = `
            <h2 class="question">${question.text}</h2>
            <div class="options">${optionsHtml}</div>
        `;

        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', handleAnswer);
        });
    }

    function handleAnswer(e) {
        const selectedValue = e.target.dataset.value;
        const questionKey = questions[currentQuestionIndex].key;
        userAnswers[questionKey] = selectedValue;

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        progressBar.style.width = '100%';
        const recommended = getRecommendations();
        
        resultsContainer.innerHTML = '';
        if (recommended.length > 0) {
            recommended.slice(0, 3).forEach(hustle => {
                resultsContainer.innerHTML += `
                    <div class="result-card">
                        <h3>${hustle.name}</h3>
                        <p>${hustle.desc}</p>
                        <button class="select-btn" data-name="${hustle.name}">この計画を見る</button>
                    </div>
                `;
            });
        } else {
            resultsContainer.innerHTML = '<p>申し訳ありませんが、あなたに合う副業が見つかりませんでした。条件を変えてお試しください。</p>';
        }

        questionnaireEl.classList.add('hidden');
        resultsEl.classList.remove('hidden');

        document.querySelectorAll('.select-btn').forEach(btn => {
            btn.addEventListener('click', showPlan);
        });
    }

    function getRecommendations() {
        const scores = sideHustles.map(hustle => {
            let score = 0;
            if (hustle.tags.includes(userAnswers.interest)) score += 3;
            if (hustle.tags.includes(userAnswers.style)) score += 2;
            
            const timeMap = { low: 'low-time', medium: 'medium-time', high: 'high-time' };
            if (hustle.tags.includes(timeMap[userAnswers.time])) score += 1;

            const incomeMap = { low: 'low-income', medium: 'medium-income', high: 'high-income' };
            if (hustle.tags.includes(incomeMap[userAnswers.income])) score += 1;

            return { ...hustle, score };
        });

        return scores.sort((a, b) => b.score - a.score);
    }

    function showPlan(e) {
        const selectedName = e.target.dataset.name;
        planTitle.textContent = selectedName;
        
        const planData = plans.default; // In a more complex app, this could be customized
        planContainer.innerHTML = '';
        for (const quarterKey in planData) {
            const quarter = planData[quarterKey];
            const tasksHtml = quarter.tasks.map(task => `<li>${task}</li>`).join('');
            planContainer.innerHTML += `
                <div class="quarter">
                    <h3>${quarter.title}</h3>
                    <ul>${tasksHtml}</ul>
                </div>
            `;
        }

        resultsEl.classList.add('hidden');
        planEl.classList.remove('hidden');
    }

    startBtn.addEventListener('click', start);
    restartBtn.addEventListener('click', start);
});