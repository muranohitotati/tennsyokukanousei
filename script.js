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
            key: 'joy',
            text: '休日に何をしている時が、一番充実していますか？',
            options: [
                { text: '友人と集まって語り合う', value: 'people' },
                { text: '新しいアイデアを形にする創作活動', value: 'creative' },
                { text: '複雑な問題を解き明かす', value: 'logic' },
                { text: '一つのことに黙々と集中する', value: 'focus' },
                { text: 'チームをまとめて目標を達成する', value: 'lead' },
            ],
        },
        {
            key: 'strength',
            text: '他人から「ありがとう」と言われるのは、どんな時が多いですか？',
            options: [
                { text: '話を聞いてくれて、気持ちが楽になった', value: 'empathy' },
                { text: '誰も気づかないようなミスを見つけてくれた', value: 'detail' },
                { text: '難しいことを分かりやすく整理してくれた', value: 'structure' },
                { text: 'あなたのアイデアは本当に面白いね', value: 'idea' },
                { text: 'リーダーシップに助けられた', value: 'management' },
            ],
        },
        {
            key: 'motivation',
            text: 'どんな状況で最も「やる気」が出ますか？',
            options: [
                { text: '誰かの役に立っていると実感した時', value: 'support' },
                { text: '自分の手で完璧なものを作り上げた時', value: 'perfection' },
                { text: '誰も思いつかない方法を発見した時', value: 'discovery' },
                { text: '計画通りに物事が進んでいる時', value: 'planning' },
                { text: '困難な目標をチームで乗り越えた時', value: 'teamwork' },
            ],
        },
        {
            key: 'approach',
            text: '未知の課題に取り組む時、あなたはどうしますか？',
            options: [
                { text: 'まずは関連する人々と話し、情報を集める', value: 'communication' },
                { text: '過去の事例やデータを徹底的に分析する', value: 'analysis' },
                { text: '直感を信じて、まず試してみる', value: 'intuition' },
                { text: '詳細なステップを書き出し、計画を立てる', value: 'stepbystep' },
                { text: 'とにかく手を動かしながら、試行錯誤する', value: 'trial' },
            ],
        },
    ];

    const talents = [
        { name: '共感の調律師', tags: ['people', 'empathy', 'support', 'communication'], desc: '人の気持ちを深く理解し、心に寄り添う力。優れたカウンセラーやコーチの素質があります。' },
        { name: '論理の建築家', tags: ['logic', 'structure', 'planning', 'analysis', 'stepbystep'], desc: '複雑な物事を整理し、堅牢なシステムを構築する力。プロジェクトマネージャーやエンジニアに向いています。' },
        { name: '創造の探検家', tags: ['creative', 'idea', 'discovery', 'intuition', 'trial'], desc: '常識にとらわれず、新しいアイデアや価値を生み出す力。アーティストや起業家としての才能を秘めています。' },
        { name: '精密の職人', tags: ['focus', 'detail', 'perfection', 'analysis'], desc: '細部にまでこだわり、物事の質を極限まで高める力。研究者や専門技術職でその力が輝きます。' },
        { name: '推進力のエンジン', tags: ['lead', 'management', 'teamwork', 'goal'], desc: 'チームを牽引し、目標達成へと導く力。優れたリーダーやプロデューサーになる可能性を秘めています。' },
    ];
    
    const plans = {
        '共感の調律師': {
            title: '「共感の調律師」の才能を伸ばすには',
            tasks: [
                'カウンセリングやコーチングの入門書を読んでみる。',
                '地域のボランティア活動に参加し、様々な人の話を聞く機会を作る。',
                '自分の感情や考えを日記に書き出し、自己理解を深める。'
            ]
        },
        '論理の建築家': {
            title: '「論理の建築家」の才能を伸ばすには',
            tasks: [
                'プログラミング学習サイトで、簡単なロジックを組んでみる。',
                '日常生活や仕事の中で、非効率なことを見つけて改善案を考えてみる。',
                'チェスや将棋など、戦略的なボードゲームを趣味にしてみる。'
            ]
        },
        '創造の探検家': {
            title: '「創造の探検家」の才能を伸ばすには',
            tasks: [
                '普段行かない場所へ散歩に行き、新しい発見を探す。',
                '美術館や展示会に足を運び、多様な表現に触れる。',
                '一つのテーマについて、制限時間を設けてアイデアを10個書き出す練習をする。'
            ]
        },
        '精密の職人': {
            title: '「精密の職人」の才能を伸ばすには',
            tasks: [
                'プラモデルや手芸など、細かい作業を要する趣味を始めてみる。',
                '自分の専門分野に関する論文や、より深い技術書を読んでみる。',
                '時間を計って、一つの作業に没頭する「ポモドーロ・テクニック」を試す。'
            ]
        },
        '推進力のエンジン': {
            title: '「推進力のエンジン」の才能を伸ばすには',
            tasks: [
                '友人との旅行や小さなイベントの幹事を引き受けてみる。',
                'リーダーシップに関する本や、尊敬する経営者の自伝を読む。',
                '目標達成アプリを使い、公に目標を宣言して自分を追い込んでみる。'
            ]
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
            recommended.slice(0, 2).forEach(talent => {
                resultsContainer.innerHTML += `
                    <div class="result-card">
                        <h3>${talent.name}</h3>
                        <p>${talent.desc}</p>
                        <button class="select-btn" data-name="${talent.name}">才能の伸ばし方を見る</button>
                    </div>
                `;
            });
        } else {
            resultsContainer.innerHTML = '<p>診断できませんでした。もう一度お試しください。</p>';
        }

        questionnaireEl.classList.add('hidden');
        resultsEl.classList.remove('hidden');

        document.querySelectorAll('.select-btn').forEach(btn => {
            btn.addEventListener('click', showPlan);
        });
    }

    function getRecommendations() {
        const scores = talents.map(talent => {
            let score = 0;
            for (const key in userAnswers) {
                if (talent.tags.includes(userAnswers[key])) {
                    score++;
                }
            }
            return { ...talent, score };
        });

        return scores.sort((a, b) => b.score - a.score);
    }

    function showPlan(e) {
        const selectedName = e.target.dataset.name;
        const planData = plans[selectedName];
        
        if (planData) {
            planTitle.textContent = planData.title;
            const tasksHtml = planData.tasks.map(task => `<li>${task}</li>`).join('');
            planContainer.innerHTML = `
                <div class="quarter"> 
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
