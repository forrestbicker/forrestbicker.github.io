; High-level: Double Ctrl opens a search GUI. Type to filter preset text, Enter to paste. Closes if focus is lost.

#NoEnv
#SingleInstance Force
SetBatchLines -1

global ListBoxItems := [], CurrentIndex := 1


List := ["fbicker@arrowstreetcapital.com", "9179755325"]

global GUIOpen := false, LastCtrl := 0, ListBox

~Ctrl::
    if (A_PriorHotkey = "~Ctrl" and A_TimeSincePriorHotkey < 300)
    {
        if !GUIOpen
            ShowSearchGUI()
    }
    LastCtrl := A_TickCount
return

ShowSearchGUI() {
    global ListBoxItems, CurrentIndex
    global GUIOpen, List, MyHwnd

    GUIOpen := true

    Gui, MyGui:New, +AlwaysOnTop +ToolWindow +HwndMyHwnd
    Gui, MyGui:Color, F5F5F5
    Gui, MyGui:Font, s10, Segoe UI

    Gui, MyGui:Add, Edit, vSearchInput gMyGuiOnEdit w300
    filtered := JoinFiltered(List, "")
    ListBoxItems := StrSplit(filtered, "|")
    CurrentIndex := 1
    Gui, MyGui:Add, ListBox, vListBox gMyGuiOnSelect w300 h200, %filtered%
    Gui, MyGui:Show,, QuickShot [fbicker] 🎈
    GuiControl, MyGui:Focus, SearchInput
    GuiControl, MyGui:Choose, ListBox, 1


    GuiControlGet, hEdit, Hwnd, SearchInput
    GuiControlGet, hListBox, Hwnd, ListBox


    OnMessage(0x100, "HandleKeyPress") ; catch Enter
    SetTimer, CheckFocusLoss, 100
}

CheckFocusLoss:
    if (GUIOpen) {
        WinGet, activeID, ID, A
        if (activeID != MyHwnd) {
            Gui, MyGui:Destroy
            GUIOpen := false
            SetTimer, CheckFocusLoss, Off
        }
    } else {
        SetTimer, CheckFocusLoss, Off
    }
return

MyGuiGuiEscape:
    Gui, MyGui:Destroy
    GUIOpen := false
    SetTimer, CheckFocusLoss, Off
return

MyGuiOnEdit:
    global ListBoxItems, CurrentIndex
    GuiControlGet, SearchInput,, SearchInput
    filtered := JoinFiltered(List, SearchInput)
    ListBoxItems := StrSplit(filtered, "|")
    GuiControl, MyGui:, ListBox, |%filtered%
    CurrentIndex := 1
    GuiControl, MyGui:Choose, ListBox, 1
return

MyGuiOnSelect:
    if (A_GuiEvent = "DoubleClick") {
        SendSelected()
    }
return

HandleKeyPress(wParam, lParam, msg, hwnd) {
    global GUIOpen, CurrentIndex, ListBoxItems
    if (!GUIOpen)
        return

    if (wParam = 13) { ; Enter
        SendSelected()
        return 0
    }

    if (wParam = 38 || wParam = 40) { ; Up or Down
        dir := (wParam = 38) ? -1 : 1
        CurrentIndex += dir
        if (CurrentIndex < 1)
            CurrentIndex := 1
        if (CurrentIndex > ListBoxItems.MaxIndex())
            CurrentIndex := ListBoxItems.MaxIndex()
        GuiControl, MyGui:Choose, ListBox, %CurrentIndex%
        return 0
    }
}

SendSelected() {
    global GUIOpen
    GuiControlGet, ListBox,, ListBox
    if (ListBox != "") {
        Gui, MyGui:Destroy
        GUIOpen := false
        SetTimer, CheckFocusLoss, Off
        Sleep 100
        WinActivate, A
        SendInput %ListBox%
    }
}

JoinFiltered(arr, filter) {
    out := ""
    Loop % arr.MaxIndex()
    {
        val := arr[A_Index]
        if (filter = "" or InStr(val, filter))
            out .= val . "|"
    }
    return RTrim(out, "|")
}
