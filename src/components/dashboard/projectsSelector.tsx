'use client'

import { generateSlug, Project } from '@/types/project'
import { THEME } from '@/utils/theme'
import { hexToHsl, hslToHex } from '@/utils/color'
import { ChevronDown, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createProject } from '@/queries/project'
import { HexColorPicker } from 'react-colorful'
import { redirect } from 'next/navigation'

interface ProjectsSelectorProps {
    projects: Project[]
    selectedProject?: Project
    onSelectProject: (project?: Project) => Promise<void>
}

export function ProjectsSelector({
    projects,
    selectedProject,
    onSelectProject,
}: ProjectsSelectorProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [showCreateProjectPopup, setShowCreateProjectPopup] = useState(false)

    const palette = {
        accent: selectedProject?.accentColor ?? THEME.colors.accent,
        softBackground: hslToHex({
            ...hexToHsl(selectedProject?.accentColor ?? THEME.colors.accent),
            l: 99,
        }),
    }

    const onCreateProject = (project: {
        title: string
        accentColor: string
    }) => {
        console.log('createProject')
        createProject({
            ...project,
            slug: generateSlug(project.title),
        }).then((project) => {
            setShowCreateProjectPopup(false)
            onSelectProject(project)
        })
    }

    return (
        <div>
            <AnimatePresence>
                {showCreateProjectPopup && (
                    <>
                        <motion.div
                            className='absolute left-0 top-0 z-40 h-full w-full backdrop-blur-sm'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDropdownOpen(false)}
                        />
                        <CreateProjectPopup
                            onCreateProject={onCreateProject}
                            onClose={() => setShowCreateProjectPopup(false)}
                        />
                    </>
                )}
            </AnimatePresence>
            <div className='relative'>
                <div
                    className='z-10 flex min-w-[180px] flex-row justify-center rounded-lg border-2 py-[6px] pl-3.5 pr-1.5'
                    style={{
                        borderColor: palette.accent,
                        color: palette.accent,
                        backgroundColor: palette.softBackground,
                    }}
                >
                    <h3 className='flex-1 select-none'>
                        {selectedProject?.title ?? 'All Projects'}
                    </h3>
                    <div className='mr-[5px] h-6 w-0.5 rounded-sm bg-gray-300' />
                    <ChevronDown
                        size={22}
                        className='mt-0.5 cursor-pointer text-gray-700'
                        style={{
                            transform: isDropdownOpen
                                ? 'rotate(180deg)'
                                : 'rotate(0)',
                            transition: 'transform 200ms ease-in-out',
                        }}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    />
                </div>
                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            className='absolute z-0 flex min-w-[200px] flex-col rounded-lg border-2 bg-white px-1.5 py-2 shadow-lg'
                            style={{
                                borderColor: palette.accent,
                                top: 'calc(100% - 1px)',
                                left: '50%',
                                translateX: '-50%',
                            }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <ProjectButton
                                key='all-projects'
                                title='All Projects'
                                onClick={() => {
                                    setIsDropdownOpen(false)
                                    if (selectedProject)
                                        onSelectProject(undefined)
                                }}
                            />
                            {projects.map((project) => (
                                <ProjectButton
                                    key={project.uuid}
                                    title={project.title}
                                    onClick={() => {
                                        setIsDropdownOpen(false)
                                        if (
                                            selectedProject?.uuid !==
                                            project.uuid
                                        )
                                            onSelectProject(project)
                                    }}
                                />
                            ))}
                            <div
                                className='mt-1 flex cursor-pointer select-none items-center gap-1 rounded-md px-2 py-0.5  text-accent hover:bg-accent/[0.1]'
                                onClick={() => {
                                    setIsDropdownOpen(false)
                                    setShowCreateProjectPopup(true)
                                }}
                            >
                                <Plus size={20} />
                                Create Project
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

const ProjectButton = ({
    title,
    onClick,
}: {
    title: string
    onClick: () => void
}) => (
    <div
        className='cursor-pointer select-none rounded-md px-2 py-0.5  hover:bg-accent/[0.1]'
        onClick={onClick}
    >
        {title}
    </div>
)

const CreateProjectPopup = ({
    onClose,
    onCreateProject,
}: {
    onClose: () => void
    onCreateProject: ({
        title,
        accentColor,
    }: {
        title: string
        accentColor: string
    }) => void
}) => {
    const [projectName, setProjectName] = useState('')
    const [color, setColor] = useState(THEME.colors.accent)

    const onSubmit = () => {
        if (projectName.length < 3) return
        onCreateProject({ title: projectName, accentColor: color })
    }

    return (
        <motion.div
            className='absolute z-50 flex min-w-80 flex-col items-start gap-3 rounded-lg bg-white p-6'
            style={{
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.12)',
                left: '50%',
                top: '50%',
                translateX: '-50%',
                translateY: '-55%',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2 }}
        >
            <h3 className='text-lg font-bold'>Create Project</h3>
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    width: '100%',
                }}
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }}
            >
                <input
                    type='text'
                    placeholder='Project Name'
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className='w-full rounded-md border-2 border-gray-200 p-2 outline-accent'
                />
                <p className='mb-3 mt-0.5 text-[12px] text-gray-400'>
                    A project name has minimum 3 characters.
                </p>
                <HexColorPicker
                    color={color}
                    onChange={setColor}
                    className='mb-2'
                />
                <button
                    className='rounded-md bg-accent px-4 py-2 text-white  selection:scale-95'
                    onClick={(e) => {
                        e.preventDefault()
                        onSubmit()
                    }}
                >
                    Create
                </button>
            </form>
            <div
                className='absolute right-0 top-0 mr-3 mt-3 cursor-pointer select-none rounded-full bg-gray-100 p-1'
                onClick={() => onClose()}
            >
                <X size={18} className='text-gray-500' />
            </div>
        </motion.div>
    )
}
