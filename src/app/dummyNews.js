const dummyNews = [
        {
            id: 1,
            title: "[날씨] 연휴 끝자락에도 '폭염 속 소나기'…모레부터 늦더위 주춤",
            content: "추석 연휴 끝자락에도 폭염 속 소나기가 예상되며 늦더위가 이어질 것으로 예상됩니다.",
            thumbnailUrl: "https://www.bing.com/th?id=OVFT.b5yKMzNt00tXN9GMsB_JQC&pid=News",
            newsUrl: "https://www.yna.co.kr/view/MYH20240918002600641",
            publishedAt: "2024-09-18T01:09:00",
            tag: "날씨, 폭염, 소나기",
            createdAt: "2024-09-18T20:29:39.657754"
        },
        {
            id:  2,
            title: "북한, 어제 오후부터 풍선 약 120개 살포‥40여 개 서울 등 낙하",
            content: "북한이 서울 등 지역에 쓰레기 풍선을 약 120개 띄운 후 40여 개의 낙하물이 확인됐습니다.",
            thumbnailUrl: "https://www.bing.com/th?id=OVFT.HiejtbQ8avGahwUuPJUlFy&pid=News",
            newsUrl: "https://imnews.imbc.com/news/2024/society/article/6637179_36438.html",
            publishedAt: "2024-09-16T02:12:00",
            tag: "북한, 쓰레기 풍선, 남한",
            createdAt: "2024-09-18T20:29:39.685187"
        },
        {
            "id": 4,
            "title": "[속보] \"북한에서는 추석날 뭐하길래\"...14일, 15일 연 이틀 '쓰레기 풍선' 도발",
            "content": "북한은 추석 연휴에 2일 연속으로 쓰레기 풍선을 날려 50여 개가 낙하되어 경기 북부와 서울에 떨어졌다고 합참이 발표했습니다.",
            "thumbnailUrl": "https://www.bing.com/th?id=OVFT.y1b46gVGW_ys3TvTwo5l5y&pid=News",
            "newsUrl": "https://www.pennmike.com/news/articleView.html?idxno=87704",
            "publishedAt": "2024-09-15T09:06:00",
            "tag": "북한, 쓰레기 풍선, 합참",
            "createdAt": "2024-09-18T20:29:39.685861"
        },
        {
            "id": 5,
            "title": "\"9월 됐다고 낮 2시 경기? 실화냐\" 관중들 '픽픽'",
            "content": "부산 사직구장에서 어제 경기한 롯데와 한화의 야구 경기에서 폭염으로 인한 온열질환으로 관중 23명이 치료를 받았습니다.",
            "thumbnailUrl": "https://www.bing.com/th?id=OVFT.ZabqVvQLNXdCLAtPLu2qSy&pid=News",
            "newsUrl": "https://imnews.imbc.com/news/2024/society/article/6637023_36438.html",
            "publishedAt": "2024-09-15T02:15:00",
            "tag": "날씨, 폭염, 야구 경기",
            "createdAt": "2024-09-18T20:29:39.686138"
        },
        {
            "id": 6,
            "title": "'어제 귀국' 조현우, 강원전 90분 무실점 선방쇼…울산은 강원 20 완파하고 '선두 탈환' [K리그1 리뷰]",
            "content": "조현우가 귀국 후 강원전에서 무실점 선방을 펼치며 울산이 강원을 20으로 완파하고 선두 탈환에 성공했습니다.",
            "thumbnailUrl": "https://www.bing.com/th?id=OVFT.DVAqnay9i6FgaWXbf7gVmC&pid=News",
            "newsUrl": "https://www.xportsnews.com/article/1905055",
            "publishedAt": "2024-09-13T15:34:00",
            "tag": "조현우, 강원전, 울산",
            "createdAt": "2024-09-18T20:29:39.686408"
        },
        {
            "id": 7,
            "title": "매서운 추석 민심, 尹대통령 국정 전환 없인 출구 없어",
            "content": "윤석열 대통령의 국정지지도가 낮아져 20%로 기록되었으며, 추석 민심이 더욱 악화될 경우 10%대 위험수위에 이를 수 있다는 분석이 나왔습니다.",
            "thumbnailUrl": "https://www.bing.com/th?id=OVFT.aggJFtPE0g5Wy4MKjtwPoS&pid=News",
            "newsUrl": "https://www.hankookilbo.com/News/Read/A2024091313110001363",
            "publishedAt": "2024-09-13T15:11:00",
            "tag": "윤석열, 대통령, 추석 민심",
            "createdAt": "2024-09-18T20:29:39.686685"
        },
        {
            "id": 8,
            "title": "모처럼 민생 우선한 국회의장의 '강제 휴전' 긍정적",
            "content": "우원식 국회의장이 민주당 강성 지지층으로부터 ‘문자 테러’를 당하고 있으며, 국회 운영을 위한 여야 조율이 필요하다는 지적이 나왔습니다.",
            "thumbnailUrl": "https://www.bing.com/th?id=OVFT.JHJj7XXMJNEuuno4Muc_Vy&pid=News",
            "newsUrl": "https://www.hankookilbo.com/News/Read/A2024091215070001731",
            "publishedAt": "2024-09-12T15:10:00",
            "tag": "우원식, 국회의장, 민주당",
            "createdAt": "2024-09-18T20:29:39.686952"
        },
        {
            "id": 9,
            "title": "'완벽한 가족' 김병철X윤상현, 과거 악연 수면 위로...김영대 사망 사건의 진실 드러났다!",
            "content": "'완벽한 가족' 드라마에서 김병철과 윤상현의 악연이 드러나며 김영대 사망 사건의 진실이 밝혀지기 시작했습니다.",
            "thumbnailUrl": "https://www.bing.com/th?id=OVFT.j-OuXfJ3cd0hJwwCOrMtgy&pid=News",
            "newsUrl": "http://www.newsshare.co.kr/1118153",
            "publishedAt": "2024-09-12T08:49:00",
            "tag": "완벽한 가족, 드라마, 김병철, 윤상현",
            "createdAt": "2024-09-18T20:29:39.687233"
        },
];

export default dummyNews;
