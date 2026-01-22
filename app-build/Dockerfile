# 1. Base Image 선택 (가벼운 Alpine Linux 사용)
# latest 태그보다는 구체적인 버전(18-alpine)을 명시해야 운영 환경이 안 깨짐. 모범사례
FROM node:18-alpine

# 2. 작업 디렉토리 설정 inside Container
WORKDIR /usr/src/app

# 3. 의존성 파일 복사 및 설치
# 소스 코드보다 package.json을 먼저 복사해야 캐싱 효율이 좋아짐. 최적화
COPY package.json ./
RUN npm install

# 4. 소스 코드 복사
COPY server.js ./

# 5. 포트 노출 (문서화 용도)
EXPOSE 8080

# 6. 컨테이너 실행 명령
CMD [ "npm", "start" ]