import { OrganizationProfile } from "@/components/organization-profile"

interface PageProps {
  params: {
    org: string
  }
}

export default function OrganizationPage({ params }: PageProps) {
  const orgName = decodeURIComponent(params.org)

  return (
    <main>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <OrganizationProfile orgName={orgName} />
      </div>
    </main>
  )
}