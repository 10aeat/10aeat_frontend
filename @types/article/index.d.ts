// article/indext.d.ts
interface ARTICLE_SUMMARY {
  complete: number
  inprogress: number
  pending: number
  hasIssue: boolean // 이슈는 진행중/대기 사항에만 있을 수 있음
}

interface REPAIR_ARTICLE_LIST {
  id: number
  category: string // 보수 종류
  adminName: string // 관리자 이름
  progress: string // 진행 상황
  title: string
  startConstruction: string // 공사 시작
  endConstruction: string // 공사 종료
  commentCount: number // 댓글 개수
  viewCount: number // 조회수
  isSave: boolean // 사용자가 해당 게시글을 저장했는지 여부(별 표시)
  issueCheck: boolean // 사용자가 이슈를 확인했는지(사용자가 이슈를 확인하면 true로 변환)
  isNewArticle: boolean // 게시글 작성 시점으로부터 24시간이 지났는지 여부
  imageUrl: string
}

interface REPAIR_ARTICLE_DETAIL {
  category: string // 보수 종류
  progress: string // 진행 상황
  isSave: boolean // 사용자가 해당 게시글을 저장했는지 여부(별 표시)
  managerId: number
  managerName: string
  createdAt: string // 게시글 작성일
  updatedAt: string // 마지막 수정일(게시글과 동일하면 수정 하지 않은 것임)
  title: string
  content: string
  imageUrls: string[] // 이미지 url
  startConstruction: string // 공사 시작
  endConstruction: string // 공사 종료
  company: string
  companyWebsite: string // 담당업체 웹사이트 url
}

interface MANAGE_ARTICLE_LIST {
  id: number
  period: string
  periodCount: number
  title: string
  allSchedule: number
  completedSchedule: number // (all이랑 complete가 동일하면 전체 완료)
  issueId: number
}

interface MANAGE_ARTICLE_DETAIL {
  period: string
  peroidCount: number
  title: string
  issue: boolean
  progress: string
  lagelBasis: string // 법적근거
  target: string // 사용내역/검사 대상
  manager: string // 점검담당
  note: string
  manageSchedule: [
    {
      manageScheduleId: number
      isComplete: boolean
      schedule: string
    },
    {
      manageScheduleId: number
      isComplete: boolean
      schedule: string
    },
  ]
}

interface MANAGE_ARTICLE_MONTHLY_LIST {
  id: number
  period: string
  periodCount: number
  title: string
  allSchedule: number
  completedSchedule: number
}

interface AGENDA_PROGRESS {
  id: number
  title: string
  content: string
  inProgress: boolean
  startSchedule: string
  endSchedule: string
}
