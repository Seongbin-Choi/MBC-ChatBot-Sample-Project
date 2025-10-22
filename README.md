# MBC ChatBot Sample Project

간단 소개
- OpenAI Agent SDK + Next.js 기반의 간단한 고객센터 챗봇 샘플 프로젝트입니다.
- 서버사이드에서 에이전트를 호출하고, 프론트엔드에서 채팅 UI를 제공합니다.

요구사항
- Node.js (v18+ 권장)
- npm 또는 yarn
- OpenAI API Key

설치 및 실행 (로컬)
```bash
# 1. 레포 클론 (이미 클론했다면 생략)
git clone https://github.com/Seongbin-Choi/MBC-ChatBot-Sample-Project.git
cd MBC-ChatBot-Sample-Project/chatbot-sample  # 실제 샘플 디렉터리로 이동

# 2. 의존성 설치
npm install

# 3. 환경변수 설정
# 프로젝트 루트에 .env.local 파일을 만들고 아래 값을 넣으세요 (절대 리포지토리에 커밋하지 마세요)
# OPENAI_API_KEY=sk-...

# 4. 개발 서버 실행 (포트 변경 예: 4000)
# mac / linux:
PORT=4000 npm run dev
# 또는 (npm script에 next dev가 있는 경우)
npm run dev -- -p 4000

# 브라우저에서 확인
# http://localhost:4000
