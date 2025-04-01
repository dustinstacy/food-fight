"use client"

import { Button } from "components"
import { useUserStore } from "stores"

import "./home.scss"

export default function Home() {
    const { user } = useUserStore()

    return (
        <div className='home-wrapper page center'>
            <div className='home'>
                <div className='title'>
                    <h1>Food</h1>
                    <h1>Fight</h1>
                </div>
                {user ? (
                    <div className='buttons'>
                        <Button className='home-button' label='Shop' type='link' path='/shop' />
                        <Button className='home-button' label='Trade' type='link' path='/trade' />
                        <Button
                            className='home-button'
                            label='Auctions'
                            type='link'
                            path='/auctions'
                        />
                        <Button
                            className='home-button'
                            label='Rentals'
                            type='link'
                            path='/rentals'
                        />
                        <Button className='home-button' label='Manage' type='link' path='/manage' />
                    </div>
                ) : (
                    <> </>
                )}
            </div>
        </div>
    )
}
