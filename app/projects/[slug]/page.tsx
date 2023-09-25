import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import type { Metadata} from 'next'
import PageSection from '@/components/Layout/Section/PageSection'
import Container from '@/components/Layout/Container'
import AppSidebar from '@/components/Sidebar/Sidebar';
import NextLink from 'next/link';
import { Chip } from '@nextui-org/chip';
import { Link } from '@nextui-org/link';
import { Divider } from '@nextui-org/divider';
import { IconArrowLeft } from '@tabler/icons-react';
import {Image} from "@nextui-org/image";
import NextImage from "next/image";
import {
  getAllProjects,
  getProjectAndMoreProjects,
  getLatestProject,
  convertToApiUrl,
  fetchGithubData,
  fetchLatestCommitDetails,
} from '@/lib/api';
import {RichTextRenderer} from '@/lib/markdown';

export const dynamicParams = true;

export async function generateStaticParams() {
  const allProjects = await getAllProjects(false);
  return allProjects.map((project) => ({ slug: project.slug }));
}

async function getProjectData(params: { slug: string }) {
  const { isEnabled } = draftMode();
  return await getProjectAndMoreProjects(params.slug, isEnabled);
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { project } = await getProjectData(params);
  const ogImageUrl = `${project.featuredImage.url}?fit=fill&w=1200&h=630`;

  return {
    title: project.projectTitle,
    description: project.shortDescription,
    openGraph: {
      title: project.projectTitle,
      description: project.shortDescription,
      url: `https://cwaitt.dev/projects/${params.slug}`,
      siteName: 'Chris Waitt - Frontend Developer Portfolio',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_GB',
      type: 'article',
      publishedTime: project.date,
      authors: 'Chris Waitt',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.projectTitle,
      description: project.shortDescription,
      creator: '@cwaitt_dev',
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': 'none',
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    }
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode();
  
  const { project, moreProjects } = await getProjectData(params);
  
  if (!project) {
    return notFound();
  }

  const githubApiUrl = convertToApiUrl(project.gitHubLink);

  const [ githubData, latestCommitDetails, latestProject ] = await Promise.all([
    fetchGithubData(githubApiUrl),
    fetchLatestCommitDetails(githubApiUrl),
    getLatestProject(isEnabled)
  ]);

  if (!project) {
    return notFound();
  }

  return (
    <PageSection id='project'>
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="col-span-2">
            <article>
              <header>
                <h1 className="custom-heading from-[#FF1CF7] to-[#b249f8]">{project.projectTitle}</h1>
              </header>
              <section className="mb-4">
              
                <Image src={`${project.featuredImage.url}?fit=fill&w=1200&h=630`}></Image>
                <RichTextRenderer description={project.description} />
                <Divider className="my-10" />
                <div className="flex flex-wrap gap-2">
                  {project.techStacksCollection.items.map((techStack) => (
                    <Chip
                      key={techStack.slug}
                      variant="bordered"
                      color="danger"
                      className="mr-1"
                    >
                      <Link color='danger' as={NextLink} href={`/tech-stack/${techStack.slug}`}>{techStack.name}</Link>
                    </Chip>
                  ))}
                </div>
                <Link
                  color="danger"
                  href="/projects"
                  as={NextLink}
                  className="mt-10"
                >
                  <IconArrowLeft className="mr-2" />
                  Back to Projects
                </Link>
              </section>
            </article>
          </div>
          <div className="col-span-1">
            <AppSidebar 
              githubData={githubData} 
              demoUrl={project.demoUrl} 
              latestCommit={latestCommitDetails.message}
              latestCommitUrl={latestCommitDetails.url}
              latestProject={latestProject} 
            />
          </div>
        </div>
      </Container>
    </PageSection>
  );
}
