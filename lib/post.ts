import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
//posts 폴더의 경로를 현재 작업 디렉토리와 합친다.
const postsDirectory = path.join(process.cwd(), 'posts')

// posts 폴더 안에 파일들 이름 가져오기
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)

  // 모든 포스트 데이터를 가진 배열 생성
  const allPostsData = fileNames.map(fileNames => {
    //id를 얻기 위해서 확장자명 .md 형식을 제거
    const id = fileNames.replace(/\.md$/, '')

    //파일 전체 경로 생성
    const fullPath = path.join(postsDirectory, fileNames)
    //파일 내용을 utf8로 형식으로 읽기
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    //front matter 파싱하기
    const matterResult = matter(fileContents)
    
    // front matter에서 날짜와 제목 추출
    return {
      id,
      ...(matterResult.data as { date: string; title: string}) //데이타 명시
    }
  })

  //얻은 포스트를 날짜순으로 정렬하기
  return allPostsData.sort((a,b) => {
    if(a.date < b.date) {
      return 1 //a가 b보다 늦으면 뒤로 정렬
    } else {
      return -1 //반대면 앞으로 정렬
    }
  })
}