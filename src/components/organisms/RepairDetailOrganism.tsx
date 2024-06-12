'use client'

import AdminCard from '@/app/admin/_components/atoms/AdminCard'
import { useState, useEffect } from 'react'
import Issue, { IssueStyle } from '../atoms/Issue'
import NavBar from '../atoms/NavBar'
import NoBox from '../atoms/NoBox'
import ShareBtn from '../atoms/ShareBtn'
import TrackingProgress from '../atoms/TrackingProgress'
import AgendaContent from '../molecules/AgendaContent'
import CommentsModal from '@/components/CommentsModal'
import ProfileModal from '@/components/ProfileModal'
import { useAccessToken } from '../store/AccessTokenStore'

export default function RepairDetailOrganism({
  repairArticleId,
  issueId,
}: {
  repairArticleId: string | string[]
  issueId: string | string[]
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [articleData, setArticleData] = useState<REPAIR_ARTICLE_DETAIL>()
  const [issueData, setIssueData] = useState<{
    title: string
    content: string
  } | null>(null)
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const { accessToken } = useAccessToken()

  useEffect(() => {
    const checkForActiveIssue = async () => {
      if (issueId) {
        try {
          const issueResponse = await fetch(
            `http://api.10aeat.com/articles/issue/detail/${issueId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                AccessToken: accessToken,
              },
            },
          )
          const issueDetail = await issueResponse.json()
          console.log('Issue detail:', issueDetail)
          setIssueData(issueDetail)
        } catch (error) {
          console.log(error)
        }
      }
    }

    const getRepairArticleData = async () => {
      try {
        const getRepairArticleResponse = await fetch(
          `http://api.10aeat.com/repair/articles/${repairArticleId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              AccessToken: accessToken,
            },
          },
        )
        const getRepairData = await getRepairArticleResponse.json()
        setArticleData(getRepairData.data)
        console.log(getRepairData)
        console.log('상세 데이터: ', articleData)
      } catch (error) {
        console.error(error)
      }
    }

    checkForActiveIssue()
    getRepairArticleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repairArticleId, accessToken, issueId])

  const handleConfirm = () => {
    setIsVisible(false)
  }

  const openCommentsModal = () => setIsCommentsModalOpen(true)
  const closeCommentsModal = () => setIsCommentsModalOpen(false)

  const openProfileModal = () => setIsProfileModalOpen(true)
  const closeProfileModal = () => setIsProfileModalOpen(false)

  return (
    <div className="flex flex-col w-full items-center">
      {issueData && isVisible && (
        <div
          className={`fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.72)] ${isVisible ? 'flex' : 'hidden'}`}
        >
          <Issue
            issueStyle={IssueStyle.ISSUE_ALERT}
            title={issueData?.title}
            content={issueData?.title}
            onConfirm={handleConfirm}
          />
        </div>
      )}
      <NavBar isTitle={false} isTextChange />
      {issueData && (
        <Issue
          issueStyle={IssueStyle.ISSUE_TOGGLE}
          title={issueData?.title}
          content={issueData?.content}
        />
      )}
      {articleData && (
        <>
          <div className="px-4 justify-center">
            <div className="font-bold text-lg font-Pretendard mb-3">
              사안 내용
            </div>
            <AgendaContent
              articleId={repairArticleId}
              category={articleData.category}
              company={articleData.company}
              companyWebsite={articleData.companyWebsite}
              content={articleData.content}
              createdAt={articleData.createdAt}
              imageUrls={articleData.imageUrls}
              isSave={articleData.isSave}
              managerId={articleData.managerId}
              managerName={articleData.managerName}
              progress={articleData.progress}
              title={articleData.title}
              updatedAt={articleData.updatedAt}
              startConstruction={articleData.startConstruction}
              endConstruction={articleData.endConstruction}
            />
          </div>
          <div className="px-4 mt-8 mb-[15px]">
            <div className="font-bold text-lg font-Pretendard mb-3">
              진행 현황
            </div>
            <TrackingProgress repairArticleId={repairArticleId} />
          </div>
          <div className="px-4 mt-8">
            <div onClick={openCommentsModal}>
              <div className="font-bold text-lg font-Pretendard mb-3">댓글</div>
              <NoBox type="댓글" />
            </div>
          </div>
          <CommentsModal
            isOpen={isCommentsModalOpen}
            onClose={closeCommentsModal}
          />
          <div className="px-4 mt-8 mb-[100px]">
            <div className="font-bold text-lg font-Pretendard mb-3">담당자</div>
            <button onClick={openProfileModal}>
              <AdminCard managerId={articleData.managerId} />
            </button>
          </div>
          <ProfileModal
            isOpen={isProfileModalOpen}
            onClose={closeProfileModal}
          />
        </>
      )}
    </div>
  )
}
