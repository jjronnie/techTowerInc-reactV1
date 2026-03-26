import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ExternalLink, FolderKanban } from 'lucide-react';
import { Button } from '@marketing/components/ui/button';
import FolderCard from '@marketing/components/shared/FolderCard';
import { useApi } from '@marketing/hooks/useApi';
import Seo from '@marketing/components/Seo';

const ClientShowPage = () => {
    const { slug } = useParams();
    const { data, loading, error } = useApi(slug ? `/clients/${slug}` : null, {
        skip: !slug,
    });
    const client = data?.data;
    const projects = client?.projects || [];

    if (loading) {
        return (
            <div className="bg-background pt-28 pb-16 text-foreground">
                <div className="next-container space-y-6">
                    <div className="shimmer h-4 w-32 rounded" />
                    <div className="shimmer h-10 w-2/3 rounded" />
                    <div className="shimmer h-5 w-3/4 rounded" />
                    <div className="shimmer h-40 w-full rounded" />
                </div>
            </div>
        );
    }

    if (error || !client) {
        return (
            <div className="bg-background pt-28 pb-16 text-foreground">
                <div className="next-container">
                    <h1 className="mb-4 text-3xl font-semibold">
                        Client not found
                    </h1>
                    <p className="mb-6 text-muted-foreground">
                        We could not find this client profile. Explore the
                        portfolio to see recent work.
                    </p>
                    <Button asChild className="next-button rounded-full px-8">
                        <Link to="/portfolio">Back to Portfolio</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background pt-28 pb-16 text-foreground">
            <div className="next-container">
                <Seo
                    title={client.name}
                    description={`${client.name} projects and partnership profile.`}
                    image={client.logo_url}
                />

                <header className="next-card overflow-hidden">
                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                        <div className="flex items-center justify-center rounded-xl border border-border/60 bg-muted/20 p-8">
                            {client.logo_url ? (
                                <img
                                    src={client.logo_url}
                                    alt={client.name}
                                    className="max-h-36 w-full object-contain"
                                />
                            ) : (
                                <div className="flex h-36 w-full items-center justify-center rounded-xl border border-dashed border-border/70 text-muted-foreground">
                                    <FolderKanban className="h-10 w-10" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-5">
                            <span className="inline-flex rounded-full border border-border/70 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                                Client profile
                            </span>
                            <h1 className="text-4xl font-semibold md:text-5xl">
                                {client.name}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {client.projects_count || projects.length}{' '}
                                project
                                {(client.projects_count || projects.length) ===
                                1
                                    ? ''
                                    : 's'}{' '}
                                delivered with this client.
                            </p>
                            {client.website_url && (
                                <Button
                                    asChild
                                    className="next-button rounded-full px-6"
                                >
                                    <a
                                        href={client.website_url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Visit website{' '}
                                        <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>

                    {client.description && (
                        <div
                            className="legacy-prose legacy-prose-lg mt-8 max-w-none text-foreground"
                            dangerouslySetInnerHTML={{
                                __html: client.description,
                            }}
                        />
                    )}
                </header>

                <section className="mt-12 space-y-6">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-semibold">
                                Projects for {client.name}
                            </h2>
                            <p className="text-muted-foreground">
                                A closer look at the work shipped together.
                            </p>
                        </div>
                        <Button
                            asChild
                            variant="outline"
                            className="next-button-outline rounded-full px-6"
                        >
                            <Link to="/portfolio">
                                View all projects{' '}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    {projects.length > 0 ? (
                        <div className="grid gap-8 lg:grid-cols-2">
                            {projects.map((project, index) => (
                                <div key={project.id} className="h-full">
                                    <FolderCard project={project} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="next-card text-center">
                            <p className="text-lg text-foreground">
                                No projects are published for this client yet.
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">
                                More work will appear here as soon as it is
                                published.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ClientShowPage;
