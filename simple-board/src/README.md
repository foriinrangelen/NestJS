### NestJS 
### nest 명령어 확인하기
```
nest --help
```

### 명령어
```Bash
nest g co board // board controller 생성
nest g mo board // board module 생성
nest g s board // board service 생성
```
### REST Client 사용하기
.http 파일생성 >
```text
# 테이블 전체 가져오기
GET http://localhost:3000/board

### POST
POST http://localhost:3000/board
content-type: application/json

{
    "title":"title11",
    "content":"contents11"
}

### PUT
PUT http://localhost:3000/board/12
content-type: application/json

{
    "title":"변경ㅇㅇㅇㅇㅇㅇㅇ",
    "content":"변경ㅇㅇㅇㅇㅇㅇㅇ"
}

### DELETE
DELETE http://localhost:3000/board/1

```